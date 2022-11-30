import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom"
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

function Article({user,id,pic, title, description, created_at, price, city, polyuser, name}) {

    const navigate = useNavigate()

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{borderRadius:"10px",maxWidth: 345, cursor:"pointer",":hover": {boxShadow: 20}}} onClick={() => navigate(`/view/${id}`)}>
                <CardHeader avatar={<Avatar sx={{ bgcolor: `var(--${city.toLowerCase()})` }} aria-label="recipe">{name.slice(0,1).toUpperCase()}</Avatar>} title={title} subheader={price}/>
                <CardMedia height="194" component="img" image={pic} alt={title}/>
                <CardContent sx={{ flexGrow: 1}}>
                    <Typography>{description}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Article