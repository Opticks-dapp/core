import "dotenv/config";
import express, { json, urlencoded } from "express";
import { getResponse } from "./zg";
import cors from "cors";

const app = express();

app.use(urlencoded());
app.use(cors({}));
app.use(json());

app.post("/response", async (req, res) => {
    // console.log(req.body);
    const resp = await getResponse(req.body.content);
    res.send({ response: resp });
});

app.listen(9090, () => {
    console.log("listening on port 9090!");
});
