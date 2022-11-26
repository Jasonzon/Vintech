
import {useState} from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

function Register({user, setUser, connection, setConnection}) {

    const [inputs, setInputs] = useState({
        mail:"",
        pseudo:"",
        password:"",
        polytech:""
    })

    async function submit() {
        const res = await fetch(`http://localhost:5500/polyuser/mail/${inputs.mail}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        if (parseRes.length === 0) {
            const body = {mail:inputs.mail, name:inputs.pseudo, password:inputs.password,polytech:inputs.polytech}
            const res2 = await fetch("http://localhost:5500/polyuser", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
            const parseRes2 = await res2.json()
            localStorage.setItem("token",parseRes2.token)
            setUser(parseRes2.rows[0])
        }
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{my: 4,mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Enregistrement</Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={inputs.mail}
                            onChange={(e) => setInputs({...inputs,mail:e.target.value})}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="^seudo"
                            label="Pseudo"
                            name="pseudo"
                            autoComplete="pseudo"
                            autoFocus
                            value={inputs.pseudo}
                            onChange={(e) => setInputs({...inputs,pseudo:e.target.value})}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs,password:e.target.value})}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label" shrink={true} >Ville</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Ville"
                                notched={true}
                                value={inputs.polytech}
                                onChange={(e) => setInputs({...inputs,polytech:e.target.value})}
                            >
                                {["Marseille","Montpellier","Grenoble","Nice","Clermont","Lyon","Savoie","Tours","Orleans","Lille","Nancy","Nantes","Angers","Sorbonne","Saclay"].map((ville) => 
                                    <MenuItem style={{backgroundColor:`var(--${ville.toLowerCase()})`}} value={ville}>{ville}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Button onClick={() => submit()} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>S'enregistrer</Button>
                        <Grid container>
                            <Grid item>
                                <Link style={{cursor:"pointer"}} onClick={() => setConnection(true)} variant="body2">Déja un compte ? Connecte-toi</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Register