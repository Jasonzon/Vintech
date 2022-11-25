
import {useState} from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/*
function Register({connection, setConnection, user, setUser}) {

    const [inputs, setInputs] = useState({
        mail:"",
        pseudo:"",
        password:"",
        polytech:""
    })

    const [holder, setHolder] = useState("")

    async function submit(e) {
        e.preventDefault()
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
        else {
            e.target.form[0].value=""
            setHolder("Mail déjà utilisé")
        }
    }

    return (
        <div className="regg">
            <div className="connection">
                <h1>Enregistrement</h1>
                <button onClick={() => setConnection(true)}>Déjà inscrit ?</button>
            </div>
            <form>
                <div>
                    <label>Mail</label>
                    <input placeholder={holder} maxLength="100" required onChange={(e) => {setInputs({mail:e.target.value, pseudo:inputs.pseudo, password:inputs.password, polytech:inputs.polytech});setHolder("")}} value={inputs.mail} type="email" id="email" name="email"/>
                </div>
                <div>
                    <label>Pseudo</label>
                    <input required maxLength="20" onChange={(e) => setInputs({mail:inputs.mail, pseudo:e.target.value.replace(/[^a-zA-Z0-9 ]/g,''), password:inputs.password, polytech:inputs.polytech})} value={inputs.pseudo} type="text" id="epseudo" name="epseudo"/>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input required maxLength="50" onChange={(e) => setInputs({mail:inputs.mail, pseudo:inputs.pseudo, password:e.target.value, polytech:inputs.polytech})} value={inputs.password} type="password" id="epassword" name="epassword"/>
                </div>
                <div>
                    <label>Polytech</label>
                    <select required onChange={(e) => setInputs({mail:inputs.mail, pseudo:inputs.pseudo, password:inputs.password, polytech:e.target.value})} value={inputs.polytech} type="text" id="epolytech" name="epolytech">
                        <option value="" disabled selected>Choisir une ville</option>
                        <option style={{backgroundColor:"var(--montpellier)"}} className="montpellier" value="Montpellier">Montpellier</option>
                        <option style={{backgroundColor:"var(--savoie)"}} className="savoie" value="Savoie">Savoie</option>
                        <option style={{backgroundColor:"var(--marseille)"}} className="marseille" value="Marseille">Marseille</option>
                        <option style={{backgroundColor:"var(--nice)"}} className="nice" value="Nice">Nice</option>
                        <option style={{backgroundColor:"var(--grenoble)"}} className="grenoble" value="Grenoble">Grenoble</option>
                        <option style={{backgroundColor:"var(--lyon)"}} className="lyon" value="Lyon">Lyon</option>
                        <option style={{backgroundColor:"var(--clermont)"}} className="clermont" value="Clermont">Clermont</option>
                        <option style={{backgroundColor:"var(--sorbonne)"}} className="sorbonne" value="Sorbonne">Sorbonne</option>
                        <option style={{backgroundColor:"var(--saclay)"}} className="saclay" value="Saclay">Saclay</option>
                        <option style={{backgroundColor:"var(--lille)"}} className="lille" value="Lille">Lille</option>
                        <option style={{backgroundColor:"var(--nancy)"}} className="nancy" value="Nancy">Nancy</option>
                        <option style={{backgroundColor:"var(--tours)"}} className="tours" value="Tours">Tours</option>
                        <option style={{backgroundColor:"var(--orleans)"}} className="orleans" value="Orleans">Orleans</option>
                        <option style={{backgroundColor:"var(--angers)"}} className="angers" value="Angers">Angers</option>
                        <option style={{backgroundColor:"var(--nantes)"}} className="nantes" value="Nantes">Nantes</option>
                    </select>
                </div>
                <button className="sub" type="submit" onClick={(e) => submit(e)}>S'enregistrer</button>
            </form>
        </div>
    )
}
*/

function Register({user, setUser, connection, setConnection}) {

    const [inputs, setInputs] = useState({
        mail:"",
        pseudo:"",
        password:"",
        polytech:""
    })

    const [holder, setHolder] = useState("")

    async function submit(e) {
        e.preventDefault()
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
        else {
            e.target.form[0].value=""
            setHolder("Mail déjà utilisé")
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
                <Box sx={{my: 8,mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
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
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link style={{cursor:"pointer"}} variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link style={{cursor:"pointer"}} onClick={() => setConnection(true)} variant="body2">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Register