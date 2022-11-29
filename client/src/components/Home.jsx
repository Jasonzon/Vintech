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
  
function Home({prop, user, setUser}) {

  const navigate = useNavigate()

  const [articles,setArticles] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
      getArticles()
  },[])

  const url = prop === "Home" ? "http://localhost:5500/article" : prop === "User" ? `http://localhost:5500/article/polyuser/${user.polyuser_id}` : ""

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
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{borderRadius:"10px",maxWidth: 345, cursor:"pointer",":hover": {boxShadow: 20}}} onClick={() => navigate(`/view/${article_id}`)}>
                <CardHeader avatar={<Avatar sx={{ bgcolor: `var(--${article_city.toLowerCase()})` }} aria-label="recipe">{polyuser_name.slice(0,1).toUpperCase()}</Avatar>} title={article_title} subheader={article_price}/>
                <CardMedia height="194" component="img" image={article_pic} alt={article_title}/>
                <CardContent sx={{ flexGrow: 1 }}>
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