require('dotenv').config()
const express = require("express")
const axios = require('axios');
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());
main().catch(err => console.log(err));
async function main() {
    const date = new Date()
    app.get("/", async function (req, res) {
        let url = process.env.URL;
        const response = await axios.get(url)
        const responseData = response.data.articles
        console.log(responseData[0])
        res.json({foundNews : responseData})
    })
    app.listen(8000, async function () {
        console.log("Server is running on port : 8000");

    })

}


