import "../styles/Article.css"
import {useNavigate} from "react-router-dom"
import Card from 'react-bootstrap/Card'

function Article({id,pic, title, description, created_at, price, city, polyuser}) {
    const navigate = useNavigate()
    return (
        <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={pic} />
                <Card.Title>{title}</Card.Title>
                <Card.Text>{price}</Card.Text>
        </Card>
    )
}

export default Article