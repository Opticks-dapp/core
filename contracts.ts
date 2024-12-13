import axios from "axios";

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

(async () => {
    const transactions = await fetchTransactions(
        "0x472cAde746560419a407CA7103c87c79c794C418",
        100,
        "key",
    );
    console.log(transactions.length);
})();
