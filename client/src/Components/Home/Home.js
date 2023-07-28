import "./Home.css"
import axios from "axios";
import {useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom";
import Loading from "../UI/LoadingSpinner/Loading";
function Home() {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState("Google")
    const date = new Date()
    const inputRef = useRef();

    function searchHandler(){
        setSearch(inputRef.current.value)
    }
    useEffect(() => {
        async function FetchNews() {
            setIsLoading(true)
            const response = await axios.get(`https://news-fafe.onrender.com/?q=${search}`)
            console.log(response)
            const responseData = response.data.foundNews
            setIsLoading(false)
            setNews(responseData)
        }
        FetchNews().catch((err) => {
            setError(true)
        });
    }, [search])
    return (
        <>
            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="date"><span style={{ fontStyle: "italic" }}>{date.toDateString()}</span>
                   
                    </div>
                    <header>THE RODENT'S GAZETTE</header>
                </div>

                <div className="subhead">DAILY NEWS by GERONIMO STILTON</div>
            </div>
            {isLoading ? <div><Loading/></div> : error ?<p className="failed">Server Error..! Failed to Fetch News!</p> : 
            <div className="container">
                <div className="row">
                
                {/* <input className="input" id="search" placeholder="Search here: Biden"/> */}
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Search" ref={inputRef} />
                            <label className="label typewriter" for="floatingInput"><p className="txt-move">Search</p></label>
                            <div className="sbtn"><button className="s-btn" onClick={searchHandler}>Search</button></div>
                        </div>
                {news.map((newsItem) => (
                    <div className="col-sm-1 col-md-6 col-lg-3">
                        <div className="card">
                            <img src={newsItem.urlToImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{newsItem.title}</h5>
                                <p className="card-text">{newsItem.content.slice(0,-15)}... <Link to={newsItem.url}>Click here</Link></p>
                                    <p class="card-text"><small class="text-muted">{newsItem.author}</small></p>


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