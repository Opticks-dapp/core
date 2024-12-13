import { createZGServingNetworkBroker } from "@0glabs/0g-serving-broker";
import { ethers } from "ethers";
import { optimism } from "viem/chains";

const serviceName = "llama8Bb";

const privateKey = "0x6537fbf4c6e25462e7229efec0b6758a0be7a85b04c7362ec289d7dbd89201a6";
const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");

const signer = new ethers.Wallet(privateKey, provider);

async function main() {
    const broker = await createZGServingNetworkBroker(signer);
    const services: any[] = await broker.listService();

    const service = services.find((s) => s[1] === serviceName);
    const serviceProviderAddress = service[0];

    const content = "Ho, how are you friend"

    // await broker.addAccount(serviceProviderAddress, 0.00000002);
    
    const account = await broker.getAccount(serviceProviderAddress);
    console.log("ACC : ",account);


    const { endpoint, model } = await broker.getServiceMetadata(
        serviceProviderAddress,
        serviceName,
    );
    console.log(endpoint)
    const headers = await broker.getRequestHeaders(
        serviceProviderAddress,
        serviceName,
        content,
    );

    const resp = await fetch(`${endpoint}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify({
            messages: [{ role: "system", content }],
            model: model,
        }),
    });

    const data = await resp.json();

    console.log(data);

    // const valid = await broker.processResponse(
    //     serviceProviderAddress,
    //     serviceName,
    //     content,
    //     chatID
    //   );
      
      
}

main();
