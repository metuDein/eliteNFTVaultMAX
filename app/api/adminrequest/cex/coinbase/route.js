import { sign } from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from "next/server";

const KEY_NAME = "organizations/9ff2994f-0d62-4da7-b6d5-fbce781cce1f/apiKeys/1e6e15ad-1b66-478f-af98-3109ee752817" || process.env.COINBASE_API_KEY; // organizations/{org_id}/apiKeys/{key_id}
const PRIVATE_KEY = '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIGfZfui4NWTItADiGq2iDZqwEb7O3UQRj3//Q1hZ9OF/oAoGCCqGSM49\nAwEHoUQDQgAEzyC/qeCVGi7NM8rN0uN757/a9JHcHXtPf6pHdWassM6CQJubQM/y\nAFCHcHMz/UTHdeTG+DflgxbyF7aExp+9Vw==\n-----END EC PRIVATE KEY-----\n' || process.env.COINBASE_API_SECRET; // Your EC private key

export async function GET(req) {
    try {
        const requestMethod = "GET";
        const requestPath = "/api/v3/brokerage/accounts";
        const uri = `${requestMethod} api.coinbase.com${requestPath}`;

        // Generate JWT
        const payload = {
            iss: "cdp",
            nbf: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 120, // Expires in 2 mins
            sub: KEY_NAME,
            uri,
        };

        const token = sign(payload, PRIVATE_KEY, {
            algorithm: "ES256",
            header: {
                kid: KEY_NAME,
                nonce: crypto.randomBytes(16).toString("hex"),
            },
        });

        // Send request to Coinbase API
        const response = await fetch(`https://api.coinbase.com${requestPath}`, {
            method: requestMethod,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "CB-VERSION": "2023-01-01",
            },
        });

        if (!response.ok) {
            throw new Error(`Coinbase API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({ balances: data.accounts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching Coinbase balances:", error.message);
        return NextResponse.json(
            { message: "Error fetching balance from Coinbase", error: error.message },
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