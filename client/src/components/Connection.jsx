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

function Connection({user, setUser, connection, setConnection}) {

    const [inputs, setInputs] = useState({
        mail:"",
        password:""
    })

    async function submit() {
        const body = {mail:inputs.mail,password:inputs.password}
        const res = await fetch("http://localhost:5500/polyuser/connect", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(body)
        })
        console.log(res)
        const parseRes = await res.json()
        if (parseRes.rows.length !== 0) {
            if (parseRes.token) {
                localStorage.setItem("token",parseRes.token)
                setUser(parseRes.rows[0])
            }
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
                    <Typography component="h1" variant="h5">Connexion</Typography>
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
                            value = {inputs.mail}
                            onChange={(e) => setInputs({...inputs,mail:e.target.value})}
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
                            value = {inputs.password}
                            onChange={(e) => setInputs({...inputs,password:e.target.value})}
                        />
                        <Button onClick={(e) => submit()} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Se connecter</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link style={{cursor:"pointer"}} variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link style={{cursor:"pointer"}} onClick={() => setConnection(false)} variant="body2">Pas de compte ? Enregistre-toi</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>        
    )
}

export default Connection