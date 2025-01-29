import crypto from 'crypto';
import { NextResponse } from "next/server";
import axios from "axios";

const COINBASE_API_URL = "https://api.pro.coinbase.com";


export async function GET(req) {
    try {
        const apiKey = "organizations/9ff2994f-0d62-4da7-b6d5-fbce781cce1f/apiKeys/1e6e15ad-1b66-478f-af98-3109ee752817";
        const apiSecret = "\nMHcCAQEEIGfZfui4NWTItADiGq2iDZqwEb7O3UQRj3//Q1hZ9OF/oAoGCCqGSM49\nAwEHoUQDQgAEzyC/qeCVGi7NM8rN0uN757/a9JHcHXtPf6pHdWassM6CQJubQM/y\nAFCHcHMz/UTHdeTG+DflgxbyF7aExp+9Vw==\n-----END EC PRIVATE KEY-----\n";

        if (!apiKey || !apiSecret) {
            return NextResponse.json({ message: "API key and secret key are required" }, { status: 400 });
        }

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const method = "GET";
        const requestPath = "/api/v3/brokerage/accounts"; // Adjust based on your endpoint

        // Create the prehash string
        const message = timestamp + method + requestPath;

        // Generate HMAC signature
        const signature = crypto.createHmac("sha256", apiSecret).update(message).digest("base64");

        const response = await fetch(`https://api.coinbase.com${requestPath}`, {
            method,
            headers: {
                "CB-ACCESS-KEY": apiKey,
                "CB-ACCESS-SIGN": signature,
                "CB-ACCESS-TIMESTAMP": timestamp,
                "CB-VERSION": "2023-01-01",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch balances: ${await response.text()}`);
        }

        const data = await response.json();
        return NextResponse.json({ balances: data }, { status: 200 });
    } catch (error) {
        console.error("Coinbase API Error:", error.message);
        return NextResponse.json({ message: "Error fetching balance from Coinbase", error: error.message }, { status: 500 });
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