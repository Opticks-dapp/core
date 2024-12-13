import { ethers } from "ethers";
import { createZGServingNetworkBroker } from "@0glabs/0g-serving-broker";
import OpenAI from "openai";

export async function getResponse(content: string) {
    if (!process.env.pvtKey) throw new Error("pvtKey is required");

    const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");

    const privateKey = process.env.pvtKey;
    const wallet = new ethers.Wallet(privateKey, provider);

    try {
        const broker = await createZGServingNetworkBroker(wallet);

        const services = await broker.listService();
        const service: any = services.find(
            (s: any) => s.name === "chat-provider-1",
        );
        const providerAddress = service.provider;

        const account = await broker.getAccount(providerAddress);

        const serviceName = service.name;

        const { endpoint, model } = await broker.getServiceMetadata(
            providerAddress,
            serviceName,
        );

        const headers = await broker.getRequestHeaders(
            providerAddress,
            serviceName,
            content,
        );

        // await broker.settleFee(
        //     providerAddress,
        //     serviceName,
        //     0.000000000018000000000000001288
        // );
        // return;

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

        if (!receivedContent) {
            throw new Error("No response from");
        }

        const chatID = completion.id;

        await broker.processResponse(
            providerAddress,
            serviceName,
            content,
            chatID,
        );

        return receivedContent;
    } catch (error) {
        console.error("Error during execution:", error);
    }
}
