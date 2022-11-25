import {useState, useEffect} from "react"
import Article from "./Article"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom"
  
function Home() {

  const navigate = useNavigate()

  const [articles,setArticles] = useState([])

  const [search, setSearch] = useState("")

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
    <Container>
      <TextField style={{marginTop:"1rem"}} value={search} onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Rechercher" variant="outlined" />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={2}>
          {articles.filter((article) => article.article_title.toLowerCase().includes(search.toLowerCase()) || article.article_description.toLowerCase().includes(search.toLowerCase())).map(({article_id,article_pic, article_title, article_description, created_at, article_polyuser, article_price, article_city},index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor:"pointer"}} onClick={() => navigate(`/view/${article_id}`)}>
                <CardMedia component="img" image={article_pic} alt={article_title} style={{objectFit: "contain",maxHeight:200}}/>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">{article_title}</Typography>
                  <Typography>{article_description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  )
}

export default Home