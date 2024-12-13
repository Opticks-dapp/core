import axios from "axios";
import { apiKey } from "./config";

export async function fetchTransactions(
    address: string,
    n: number,
    apiKey: string,
) {
    const url =
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${n}&sort=desc&apikey=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status === "1") {
        return response.data.result;
    } else {
        throw new Error(response.data.message);
    }
}

