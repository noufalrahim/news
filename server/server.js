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
        const userInput = req.query.q;
        let url =  `https://newsapi.org/v2/everything?q=${userInput}&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&to=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=popularity&apiKey=291d6b9c094142b4907fca124c03e2c7`;
        const response = await axios.get(url)
        const responseData = response.data.articles
        res.json({foundNews : responseData})
    })
    app.listen(8000, async function () {
        console.log("Server is running on port : 8000");

    })

}


