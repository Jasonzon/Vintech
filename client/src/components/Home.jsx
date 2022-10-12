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
                {articles.map(({article_pic, article_title, article_description, created_at, article_polyuser, article_price, article_city}) => 
                    <Article 
                        pic={article_pic}
                        title={article_title}
                        description={article_description}
                        created_at={created_at}
                        polyuser={article_polyuser}
                        price={article_price}
                        city={article_city}
                    />
                )}
            </ul>
        </div>
    )
}

export default Home