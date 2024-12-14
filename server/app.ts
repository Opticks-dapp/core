import "dotenv/config";
import express, { json, urlencoded } from "express";
import { getResponse } from "./zg";
import cors from "cors";
import { apiKey } from "./config";
import axios from "axios";

const app = express();

app.use(urlencoded());
app.use(cors({}));
app.use(json());

app.post("/response", async (req, res) => {
    // console.log(req.body);
    // const resp = await getResponse(req.body.content);
    for (let i = 0; i < 5_000_000_000; i++) {
    }
    res.send({ response: "resp" });
});

app.get("/etherscan", async (req, res) => {
    let reqUrl = req.url.replace("/etherscan", "https://api.etherscan.io/api");
    reqUrl += `&apikey=${apiKey}`;

    const response = await axios.get(reqUrl);

    if (response.data.status === "1") {
        res.send(response.data.result);
    } else {
        throw new Error(response.data.message);
    }
});
app.get("/etherscan/*", async (req, res) => {
    let reqUrl = req.url.replace("/etherscan/", "https://api.etherscan.io/api/");
    reqUrl += `&apikey=${apiKey}`;

    const response = await axios.get(reqUrl);

    if (response.data.status === "1") {
        res.send(response.data.result);
    } else {
        throw new Error(response.data.message);
    }
});

app.listen(9090, () => {
    console.log("listening on port 9090!");
});
