import {useState, useEffect} from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom"
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Article from "./Article"  

function Home({prop, user, setUser}) {

  const navigate = useNavigate()

  const [articles,setArticles] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
      getArticles()
  },[])

  const url = prop === "Home" ? "http://localhost:5500/article" : prop === "User" ? `http://localhost:5500/article/polyuser/${user.polyuser_id}` : `http://localhost:5500/fav/polyuser/${user.polyuser_id}`

  async function getArticles() {
      const res = await fetch(url, {
          method: "GET"
      })
      const parseRes = await res.json()
      setArticles(parseRes)
  }

  return (
    <Container>
      <TextField fullWidth style={{marginTop:"1rem"}} value={search} onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Rechercher" variant="outlined" />
      <Container sx={{ py: 4 }} alignItems="center">
        <Grid container spacing={2}>
          {articles.filter((article) => article.article_title.toLowerCase().includes(search.toLowerCase()) || article.article_description.toLowerCase().includes(search.toLowerCase())).map(({article_id,article_pic, article_title, article_description, created_at, article_polyuser, article_price, article_city,polyuser_name},index) => (
            <Article key={index} user={user} id={article_id} pic={article_pic} title={article_title} description={article_description} created_at={created_at} polyuser={article_polyuser} price={article_price} city={article_city} name={polyuser_name} />
          ))}
        </Grid>
      </Container>
    </Container>
  )
}

export default Home