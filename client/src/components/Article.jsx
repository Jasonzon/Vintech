import "../styles/Article.css"
import {Link} from "react-router-dom"

function Article({id,pic, title, description, created_at, price, city, polyuser}) {
    return (
        <Link to={`/view/${id}`}>
            <div className="article" style={{borderColor:`var(--${city.toLowerCase()})`}}>
                <h3>{title}</h3>
                <img alt={title} src={pic} />
                <h3>{price}</h3>
            </div>
        </Link>
    )
}

export default Article