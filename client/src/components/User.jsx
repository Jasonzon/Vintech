import {useState, useEffect} from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Home from "./Home"
import Grid from "@mui/material/Grid"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"

function User({user, setUser}) {

    function logout() {
        localStorage.removeItem("token")
        setUser({})
    }

    const [modify, setModify] = useState(false)

    const [inputs, setInputs] = useState({pseudo:user.polyuser_name,description:user.polyuser_description,city:user.polyuser_city})

    async function update() {
        if (inputs.pseudo !== "") {
            const body = {mail:user.polyuser_mail,role:user.polyuser_role,name:inputs.pseudo,description:inputs.description,city:inputs.city}
            const res2 = await fetch(`http://localhost:5500/polyuser/${user.polyuser_id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json",token: localStorage.token},
                body:JSON.stringify(body)
            })
            const parseRes2 = await res2.json()
            setModify(false)
            setUser({polyuser_id:parseRes2.polyuser_id,polyuser_role:parseRes2.polyuser_role,polyuser_mail:user.polyuser_mail,polyuser_description:parseRes2.polyuser_description,polyuser_name:parseRes2.polyuser_name,polyuser_city:parseRes2.polyuser_city})
        }
    }

    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {!modify ?
                    <Card sx={{maxWidth:500, minWidth:300}}>
                        <CardHeader avatar={<Avatar sx={{ bgcolor:  `var(--${user.polyuser_city.toLowerCase()})`  }} aria-label="recipe">{user.polyuser_name.slice(0,1).toUpperCase()}</Avatar>}
                            title={<Typography variant="h5">{user.polyuser_name}</Typography>}
                            subheader={user.polyuser_city}
                        />
                        <CardContent>
                            <Typography variant="h6">{user.polyuser_mail}</Typography>
                            <Typography variant="body2">{user.polyuser_description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Container sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <Button onClick={() => setModify(true)} variant="contained" sx={{ mb: 2 }}>Modifier</Button>
                                <Button onClick={() => logout()} variant="contained" sx={{ mb: 2 }}>Déconnexion</Button>
                            </Container>
                        </CardActions>
                    </Card>  
                    :
                    <Card sx={{maxWidth:500, minWidth:300}}>
                        <CardHeader avatar={<Avatar sx={{ bgcolor:  `var(--${user.polyuser_city.toLowerCase()})`  }} aria-label="recipe">{user.polyuser_name.slice(0,1).toUpperCase()}</Avatar>}
                            title={<TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="pseudo"
                                        label="Pseudo"
                                        name="pseudo"
                                        autoComplete="pseudo"
                                        autoFocus
                                        value={inputs.pseudo}
                                        onChange={(e) => setInputs({inputs,pseudo:e.target.value})}
                                    />}
                            subheader={<FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label" shrink={true} >Ville</InputLabel><Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Ville"
                                notched={true}
                                value={inputs.city}
                                onChange={(e) => setInputs({...inputs,city:e.target.value})}
                            >
                                {["Marseille","Montpellier","Grenoble","Nice","Clermont","Lyon","Savoie","Tours","Orleans","Lille","Nancy","Nantes","Angers","Sorbonne","Saclay"].map((ville) => 
                                    <MenuItem style={{backgroundColor:`var(--${ville.toLowerCase()})`}} value={ville}>{ville}</MenuItem>
                                )}
                            </Select></FormControl>}
                        />
                        <CardContent sx={{pt:0}}>
                            <Typography variant="h6">{user.polyuser_mail}</Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                autoFocus
                                value={inputs.description}
                                onChange={(e) => setInputs({inputs,description:e.target.value})}
                            />
                        </CardContent>
                        <CardActions fullWidth>
                            <Container sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <Button onClick={() => setModify(false)} variant="contained" sx={{ mb: 2}}>Annuler</Button>
                                <Button onClick={() => update()} variant="contained" sx={{ mb: 2 }}>valider</Button>
                            </Container>
                        </CardActions>
                  </Card> }
            </Box>
            <Home prop="User" user={user} setUser={setUser}/>
        </Container>
    )
}

export default User