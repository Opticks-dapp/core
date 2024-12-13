import { ethers } from "ethers";
import { createZGServingNetworkBroker } from "@0glabs/0g-serving-broker";
import OpenAI from "openai";

async function main() {
    const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");

    const privateKey =
        "0x6537fbf4c6e25462e7229efec0b6758a0be7a85b04c7362ec289d7dbd89201a6";
    const wallet = new ethers.Wallet(privateKey, provider);

    try {
        const broker = await createZGServingNetworkBroker(wallet);

        const services = await broker.listService();
        console.log(services)
        const service : any = services.find(
            (s:any) => s.name === "chat-provider-1",
        );
        const providerAddress = service.provider;

        const initialBalance = 0.00000002;
        // await broker.addAccount(providerAddress, initialBalance);
        console.log("first");

        const account = await broker.getAccount(providerAddress);
        console.log(account);

        const serviceName = service.name;
        const content = "Hi, choose a word randomly, only respond in one word : memecoin, swap, defi, lending, game";

        const { endpoint, model } = await broker.getServiceMetadata(
            providerAddress,
            serviceName,
        );

        const headers = await broker.getRequestHeaders(
            providerAddress,
            serviceName,
            content,
        );

        const openai = new OpenAI({
            baseURL: endpoint,
            apiKey: "",
        });
        const completion = await openai.chat.completions.create(
            {
                messages: [{ role: "system", content }],
                model: model,
            },
            {
                headers: {
                    ...headers,
                },
            },
        );

        const receivedContent = completion.choices[0].message.content;
        const chatID = completion.id;
        console.log(receivedContent);
        console.log("Response:", receivedContent);

        if (!receivedContent) {
            throw new Error("No response from")
        }

        const isValid = await broker.processResponse(
            providerAddress,
            serviceName,
            receivedContent,
            chatID,
        );
        console.log(isValid);
    } catch (error) {
        console.error("Error during execution:", error);
    }
}

main();
