import axios from "axios";

// const baseURL = 'http://localhost:3500'
const baseURL = 'https://c96e-197-210-55-114.ngrok-free.app'

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})
