import "../styles/Home.css"
import {useState, useEffect} from "react"
import Article from "./Article"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

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
                <label>Rechercher</label>
                <input name="search" className="search" />
            </div>
            <Container>
                <Row>
                {articles.map(({article_id,article_pic, article_title, article_description, created_at, article_polyuser, article_price, article_city},index) => 
                    <Col>
                        <Article key={article_title}
                            pic={article_pic}
                            title={article_title}
                            description={article_description}
                            created_at={created_at}
                            polyuser={article_polyuser}
                            price={article_price}
                            city={article_city}
                            id={article_id}
                        />
                    </Col>
                )}
                </Row>
            </Container>
        </div>
    )
}

export default Home