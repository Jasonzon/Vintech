import "../styles/View.css"
import {useState, useEffect} from "react"
import {useParams} from "react-router"

function View() {

    const [view, setView] = useState({
        article_title:"",
        article_pic:"",
        article_description:"",
        article_city:"",
        article_price:"",
        created_at:"",
        polyuser_name:""
    })

    async function getView() {
        const {id} = useParams()
        const res = await fetch(`http://localhost:5500/article/${id}`,{
            method: "GET"
        })
        const parseRes = await res.json()
        setView(parseRes)
    }

    useEffect(() => {
        getView()
    },[])

    return (
        <div className="view">
            <h1>{view.article_title}</h1>
            <h2>{view.article_price}</h2>
            <img src={view.article_pic} alt={view.article_title}/>
            <p>{view.article_description}</p>
            <h3>{view.polyuser_name}</h3>
            <h3>{view.article_city}</h3>
        </div>
    )
}

export default View