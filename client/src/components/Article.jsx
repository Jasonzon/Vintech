import "../styles/Article.css"

function Article({pic, title, description, created_at, price, city, polyuser}) {
    return (
        <div className="article">
            <h3>{title}</h3>
            <p>{city}</p>
            <img alt={title} src={pic} />
            <h3>{price}</h3>
        </div>
    )
}

export default Article