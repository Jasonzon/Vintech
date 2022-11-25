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

/*
function Home() {

    const [articles,setArticles] = useState([])

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
        <div className="home">
            <div className="filter">
                <label>Rechercher</label>
                <input name="search" className="search" />
            </div>
            <Container>
                <Row>
                {articles.map(({article_id,article_pic, article_title, article_description, created_at, article_polyuser, article_price, article_city},index) => 
                    <Col>
                        <Article key={article_title}
                            pic={article_pic}
                            title={article_title}
                            description={article_description}
                            created_at={created_at}
                            polyuser={article_polyuser}
                            price={article_price}
                            city={article_city}
                            id={article_id}
                        />
                    </Col>
                )}
                </Row>
            </Container>
        </div>
    )
}

export default Home

*/
  
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
function Home() {
  return (
    <Box>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">Your Website</Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Box>
  );
}

export default Home