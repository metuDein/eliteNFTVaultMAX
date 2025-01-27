import crypto from "crypto";
import { NextResponse } from "next/server";
import axios from "axios";

const COINBASE_API_URL = "https://api.coinbase.com/v2";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get("apiKey");
    const secretKey = searchParams.get("secretKey");

    if (!apiKey || !secretKey) {
        return NextResponse.json({ message: "API key and secret key are required" }, { status: 400 });
    }

    try {
        const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
        const requestPath = "/v2/accounts";
        const method = "GET";
        const body = ""; // Empty for GET requests

        // Generate the signature
        const message = timestamp + method + requestPath + body;
        const signature = crypto.createHmac("sha256", secretKey).update(message).digest("hex");

        // Make the request to Coinbase API
        const response = await axios.get(`${COINBASE_API_URL}/accounts`, {
            headers: {
                "CB-ACCESS-KEY": apiKey,
                "CB-ACCESS-SIGN": signature,
                "CB-ACCESS-TIMESTAMP": timestamp,
                "CB-VERSION": "2023-01-01", // API version
            },
        });

        // Parse balances
        const balances = response.data.data
            .filter((account) => parseFloat(account.balance.amount) > 0)
            .reduce((acc, account) => {
                acc[account.currency] = account.balance.amount;
                return acc;
            }, {});

        return NextResponse.json({ balances }, { status: 200 });
    } catch (error) {
        console.error("Error fetching Coinbase balances:", error.response?.data || error.message);
        return NextResponse.json(
            { message: "Error fetching balance from Coinbase", error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}



export async function POST(req, res) {


    const { apiKey, secretKey, amount, to, currency } = req.json();

    if (!apiKey || !secretKey || !amount || !to || !currency) {
        return NextResponse.json({ message: "all fields required" }, { status: 400 });
    }

    try {
        const res = await axios.post(
            `${COINBASE_API_URL}/transactions/send`,
            {
                type: "send",
                to,
                amount,
                currency,
            },
            {
                auth: {
                    username: apiKey,
                    password: secretKey,
                },
            }
        );

        return NextResponse.json({ res }, { status: 200 });
    } catch (error) {
        console.log(error.name, ": ", error.message,);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}