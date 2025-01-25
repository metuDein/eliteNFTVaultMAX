
import axios from '@/utils/axios';
import { NextResponse } from 'next/server';
import crypto from "crypto"

const BINANCE_API_URL = "https://api.binance.com";
export async function GET(req, res) {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;

    const timestamp = Date.now();
    const recvWindow = 5000;

    const serverTimeResponse = await axios.get(`${BINANCE_API_URL}/api/v3/time`);
    const serverTime = serverTimeResponse.data.serverTime;

    const query = `timestamp=${serverTime}`;
    const signature = crypto
        .createHmac("sha256", apiSecret)
        .update(query)
        .digest("hex");

    console.log("Query:", query);
    console.log("Signature:", signature);
    const headers = {
        'X-MBX-APIKEY': apiKey,
        'X-MBX-Timestamp': timestamp,
        'X-MBX-RecvWindow': recvWindow,
    };

    const params = {
        timestamp,
        recvWindow,
        signature,
    };

    try {
        const response = await axios.get(
            'https://api.binance.com/api/v3/account',
            { headers, params }
        );

        console.log(response.data);
        return NextResponse.json({ message: response.data }, { status: 200 });
    } catch (error) {
        console.error(error.name, ": ", error.message?.data);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

