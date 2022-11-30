import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from "@mui/material/Container"

function View({user, setUser}) {

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

  const [liked, setLiked] = useState(false)

  async function getFav() {
    const res = await fetch(`http://localhost:5500/fav/get/${id}/${user.polyuser_id}`, {
      method: "GET"
    })
    const parseRes = await res.json()
    if (parseRes.fav_polyuser) {
      setLiked(true)
    }
  }

  async function getView() {
      const res = await fetch(`http://localhost:5500/article/${id}`,{
          method: "GET"
      })
      const parseRes = await res.json()
      console.log(parseRes)
      setView(parseRes)
  }

  useEffect(() => {
      getView()
  },[])

  useEffect(() => {
    if (user.polyuser_name) {
      getFav()
    }
  },[user])

  async function like() {
    const body = {article:id,polyuser:user.polyuser_id}
    const res = await fetch("http://localhost:5500/fav", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body:JSON.stringify(body)
    })
    const parseRes = await res.json()
    setLiked(true)
  }

  async function dislike() {
    const res = await fetch(`http://localhost:5500/fav/${id}`, {
      method: "DELETE"
    })
    const parseRes = await res.json()
    setLiked(false)
  }

  return (
    <Container sx={{ py: 3 }} style={{ display:'flex', justifyContent:'center' }}>
      <Card sx={{ maxWidth: 500}}>
        <CardHeader avatar={<Avatar sx={{ bgcolor:  `var(--${view.article_city.toLowerCase()})`  }} aria-label="recipe">{view.polyuser_name.slice(0,1).toUpperCase()}</Avatar>}
        title={view.article_title}
        subheader={view.article_price}
        />
        <CardMedia
          component="img"
          widht="100%"
          image={view.article_pic}
          alt={view.article_title}
        />
        <CardContent sx={{pb:0}}>
          <Typography variant="body2" color="text.secondary">{view.article_description}</Typography>
        </CardContent>
        {user.polyuser_name ?
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon onClick={() => liked ? dislike() : like()} style={liked ? { color: "red" } : {}} />
          </IconButton>
        </CardActions> : null }
      </Card>
    </Container>
  )
}

export default View