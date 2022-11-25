import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

function View() {
    const {id} = useParams()

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
            <div className="view-left">
                <h1>{view.article_title}</h1>
                <h2>{view.article_price}</h2>
                <p>{view.article_description}</p>
                <h3>{view.polyuser_name}</h3>
                <h3>{view.article_city}</h3>
            </div>
            <div className="view-right">
                <img src={view.article_pic} alt={view.article_title}/>
            </div>
        </div>
    )
}

export default View