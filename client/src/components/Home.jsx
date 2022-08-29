import "../styles/Home.css"
import {useState, useEffect} from "react"
import Article from "./Article"

function Home() {

    const [articles,setArticles] = useState([])

    useEffect(() => {
        getArticles()
    },[])

    async function getArticles() {
        const res = await fetch("http://localhost:5500/article", {
            method: "GET"
        })
        const parseRes = await res.json()
        setArticles(parseRes)
    }

    return (
        <div className="home">
            <div className="filter">
                <label for="search">Rechercher</label>
                <input name="search" className="search" />
            </div>
            <ul className="list">
                {articles.map(({}) => 
                    <Article 
                        
                    />
                )}
            </ul>
        </div>
    )
}

export default Home