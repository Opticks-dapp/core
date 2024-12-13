import axios from "axios";
import { apiKey } from "./config";

// Fetch transactions for a given address
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

// Delay function
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const graph: Record<string, string[]> = {};
const visitedAddresses = new Set<string>();

async function buildGraph(
    address: string,
    depth: number,
    width: number,
    currentDepth: number = 1,
) {
    address = address.toLowerCase()
    if (currentDepth > depth || visitedAddresses.has(address)) {
        return; // Stop recursion if depth exceeded or already visited
    }

    visitedAddresses.add(address);

    try {
        // Delay before making the API call
        await sleep(175); // 0.5-second delay

        const transactions = await fetchTransactions(address, width, apiKey);

        if (!graph[address]) {
            graph[address] = [];
        }

        const connectedAddresses = new Set<string>();

        transactions.forEach((tx: any) => {
            if (tx.to && !visitedAddresses.has(tx.to)) {
                graph[address].push(tx.to.toLowerCase());
                connectedAddresses.add(tx.to.toLowerCase());
            }
        });

        // Recursively build the graph for each connected address
        for (const connectedAddress of connectedAddresses) {
            await buildGraph(connectedAddress, depth, width, currentDepth + 1);
        }
    } catch (error) {
        console.error(
            `Error fetching transactions for address ${address}:`,
            error,
        );
    }
}

function printGraph(graph: Record<string, string[]>) {
    const edges = new Set<string>(); // To handle duplicate edges
    let output = "graph G {\n";

    for (const node in graph) {
        graph[node].forEach((neighbor) => {
            const edge = `"${node}" -- "${neighbor}"`;
            if (!edges.has(edge)) {
                edges.add(edge);
                output += `\t${edge};\n`; // Append edge to output
            }
        });
    }

    output += "}";
    return output;
}

async function main() {
    const startingAddress = "0xe29E09fFA0696758555f59A53Ba602e00880504A";
    const depth = 3;
    const width = 100;

    console.log(`Building graph with depth ${depth} and width ${width}...`);
    await buildGraph(startingAddress, depth, width);

    console.log(printGraph(graph));
}

main();
