const { sign } = require("jsonwebtoken");
const crypto = require("crypto");

const key_name = "organizations/9ff2994f-0d62-4da7-b6d5-fbce781cce1f/apiKeys/1e6e15ad-1b66-478f-af98-3109ee752817";
const key_secret = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIGfZfui4NWTItADiGq2iDZqwEb7O3UQRj3//Q1hZ9OF/oAoGCCqGSM49\nAwEHoUQDQgAEzyC/qeCVGi7NM8rN0uN757/a9JHcHXtPf6pHdWassM6CQJubQM/y\nAFCHcHMz/UTHdeTG+DflgxbyF7aExp+9Vw==\n-----END EC PRIVATE KEY-----\n`;

const request_method = "GET";
const url = "api.coinbase.com";
const request_path = "/api/v3/brokerage/accounts";
const uri = `${request_method} ${url}${request_path}`;

const token = sign(
    {
        iss: "cdp",
        nbf: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 120,
        sub: key_name,
        uri,
    },
    key_secret,
    {
        algorithm: "ES256",
        header: {
            kid: key_name,
            nonce: crypto.randomBytes(16).toString("hex"),
        },
    }
);

console.log("JWT Token:", token);
