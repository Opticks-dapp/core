import axios from "axios";
import { useState } from "react";

export default function () {
  // const [dot, setDot] = useState("");
  const graph: Record<string, string[]> = {};
  const visitedAddresses = new Set<string>();

  const vis = window.vis as any;

  const [address, setAddress] = useState("");
  const [depth, setDepth] = useState(2);
  const [width, setWidth] = useState(50);

  async function buildGraph(
    address: string,
    depth: number,
    width: number,
    currentDepth: number = 1
  ) {
    address = address.toLowerCase();
    if (currentDepth > depth || visitedAddresses.has(address)) {
      return; // Stop recursion if depth exceeded or already visited
    }

    visitedAddresses.add(address);

    try {
      // Delay before making the API call
      await sleep(200); // delay
      console.log("behaj");
      printGraph(graph);

      const transactions = await fetchTransactions(address, width);

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
        error
      );
    }

    console.log(hitsAlgorithm(graph, 20))
  }

  function printGraph(graph: Record<string, string[]>) {
    const edges = new Set<string>(); // To handle duplicate edges
    let output = "graph G {\n";
    output += `"${address.toLowerCase()}" [color=lightpink];\n`

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
    // return output;

    var parsedData = vis.parseDOTNetwork(output);

    var data = {
      nodes: parsedData.nodes,
      edges: parsedData.edges,
    };

    var options = parsedData.options;

    // you can extend the options like a normal JSON variable:
    options.nodes = {
      // color: "teal",
    };

    const container = document.getElementById("mynetwork");

    // create a network
    var network = new vis.Network(container, data, options);
    console.log(network)

    return output;
  }

  return (
    <div className="flex p-10">
      <div className="flex flex-col w-1/3 gap-y-3">
        <div className="flex text-sm flex-col gap-y-3 py-5">
          <div className="flex">
            <p>Depth : </p>
            <input
              type="number"
              defaultValue={2}
              max={3}
              name="depth"
              onChange={(e) => setDepth(Number(e.target.value))}
              className="border ml-2 mr-10 rounded border-black/30 w-10 px-1"
            />
          </div>

          <div className="flex">
            <p>Width : </p>
            <input
              type="number"
              max={100}
              defaultValue={50}
              name="width"
              onChange={(e) => setWidth(Number(e.target.value))}
              className="border ml-2 mr-10 rounded border-black/30 w-20 px-1"
            />
          </div>

          <div className="flex mt-3">
            <p>Starting Address </p>
            <br />
            <input
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              className="border ml-2 rounded border-black/30 px-1"
            />
          </div>
        </div>

        <button
          className="bg-sky-600 text-white py-1 w-max mx-auto px-10 rounded"
          onClick={() => {
            buildGraph(address, depth, width);
          }}
        >
          Start
        </button>
      </div>

      <figure id="mynetwork" className="w-full h-[80vh] ml-8 bg-blue-50" />
    </div>
  );
}

async function fetchTransactions(address: string, n: number) {
  const url = `http://127.0.0.1:9090/etherscan?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${n}&sort=desc`;
  const response = await axios.get(url);
  //   if (response.data.status === "1") {
  console.log(response);
  return response.data;
  //   } else {
  // throw new Error(response.data.message);
  //   }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type Graph = { [key: string]: string[] }; // Adjacency list representation of the graph
type Scores = { [key: string]: number }; // Stores hub and authority scores

function hitsAlgorithm(graph: Graph, iterations: number = 10): { hubs: Scores; authorities: Scores } {
  const nodes = Object.keys(graph);
  const hubs: Scores = {};
  const authorities: Scores = {};

  // Initialize all hub and authority scores to 1
  for (const node of nodes) {
    hubs[node] = 1;
    authorities[node] = 1;
  }

  // Perform iterative computation
  for (let iter = 0; iter < iterations; iter++) {
    // Step 1: Update authority scores
    for (const node of nodes) {
      authorities[node] = 0; // Reset authority score
      for (const neighbor of nodes) {
        if (graph[neighbor].includes(node)) {
          authorities[node] += hubs[neighbor];
        }
      }
    }

    // Step 2: Update hub scores
    for (const node of nodes) {
      hubs[node] = 0; // Reset hub score
      for (const neighbor of graph[node]) {
        hubs[node] += authorities[neighbor];
      }
    }

    // Step 3: Normalize the scores to avoid NaN
    const authoritySum = Math.sqrt(
      Object.values(authorities).reduce((sum, score) => sum + score ** 2, 0)
    );
    const hubSum = Math.sqrt(
      Object.values(hubs).reduce((sum, score) => sum + score ** 2, 0)
    );

    if (authoritySum === 0 || hubSum === 0) {
      throw new Error("Graph contains disconnected components or cycles with no links!");
    }

    for (const node of nodes) {
      authorities[node] /= authoritySum;
      hubs[node] /= hubSum;
    }
  }

  return { hubs, authorities };
}