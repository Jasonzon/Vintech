import "../styles/Article.css"
import {useNavigate} from "react-router-dom"

function Article({id,pic, title, description, created_at, price, city, polyuser}) {
    const navigate = useNavigate()
    return (
            <div onClick={() => navigate(`/view/${id}`)} className="article" style={{color:`var(--${city.toLowerCase()})`}}>
                <h3>{title}</h3>
                <img alt={title} src={pic} />
                <h3>{price}</h3>
            </div>
    )
}

export default Article