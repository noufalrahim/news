import "./Home.css"
import axios from "axios";
import {useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Loading from "../UI/LoadingSpinner/Loading";
function Home() {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState([]);
    const date = new Date()

    useEffect(() => {
        async function FetchNews() {
            setIsLoading(true)
            const response = await axios.get(`https://newsapi.org/v2/everything?q=all&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&to=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=popularity&apiKey=291d6b9c094142b4907fca124c03e2c7`)
            const responseData = response.data.foundNews
            setIsLoading(false)
            setNews(responseData)
        }
        FetchNews().catch((err) => {
            setError(true)
        });
    }, [])
    return (
        <>
            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="date"><span style={{ fontStyle: "italic" }}>{date.toDateString()}</span>
                   
                    </div>
                    <header>THE TIMES GAZATTE</header>
                </div>

                <div className="subhead">DAILY WORLD NEWS</div>
            </div>
            {isLoading ? <div><Loading/></div> : error ?<p className="failed">Server Error..! Failed to Fetch News!</p> : 
            <div className="container">
                <div className="row">
                {news.map((newsItem) => (
                    <div className="col-sm-1 col-md-6 col-lg-3">
                        <div className="card">
                            <img src={newsItem.urlToImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{newsItem.title}</h5>
                                <p className="card-text">{newsItem.content.slice(0,-15)}... <Link to={newsItem.url}>Click here</Link></p>
                                    <p className="card-text"><small className="text-muted">{newsItem.author}</small></p>


                            </div>
                        </div>
                        </div>
                       ))} 
                    </div>
            </div>}
            




        </>
    )
}
export default Home;