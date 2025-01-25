import crypto from "crypto";
import axios from "axios";
import { NextResponse } from "next/server";

const BINANCE_API_URL = "https://api.binance.com";

export async function GET(req) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const apiKey = searchParams.get("apiKey");
        const secretKey = searchParams.get("secretKey");

        if (!apiKey || !secretKey) {
            return NextResponse.json({ message: "API key and secret key are required" }, { status: 400 });
        }

        // Binance API request
        const timestamp = Date.now();
        const query = `timestamp=${timestamp}`;
        const signature = crypto
            .createHmac("sha256", secretKey)
            .update(query)
            .digest("hex");

        const response = await axios.get(`${BINANCE_API_URL}/api/v3/account`, {
            headers: {
                "X-MBX-APIKEY": apiKey,
            },
            params: {
                timestamp,
                signature,
            },
        });

        // Filter and format balances
        const balances = response.data.balances
            .filter((balance) => parseFloat(balance.free) > 0)
            .reduce((acc, curr) => {
                acc[curr.asset] = curr.free;
                return acc;
            }, {});

        return NextResponse.json({ balances });
    } catch (error) {
        console.error("Error fetching balances:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
