import {Link, useNavigate} from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react"

function Header({user, setUser}) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate()

  return (
    <AppBar position="static" style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h4" noWrap sx={{mr: 2,display: {cursor:"pointer", xs: 'none', md: 'flex' },fontFamily: 'monospace',fontWeight: 700,color: 'inherit',textDecoration: 'none'}} onClick={() => navigate("/")}>Vintech</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {user.polyuser_name ? 
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/vendre"><Typography textAlign="center">Vendre</Typography></Link>
                </MenuItem> : null}
                {user.polyuser_name ?
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/messages"><Typography textAlign="center">Messages</Typography></Link>
                </MenuItem> : null }
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/profil"><Typography textAlign="center">Profil</Typography></Link>
                </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h4" noWrap sx={{mr: 2,display: {cursor:"pointer", xs: 'flex', md: 'none' },flexGrow: 1,fontFamily: 'monospace',fontWeight: 700,color: 'inherit',textDecoration: 'none',}} onClick={() => navigate("/")}>Vintech</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {user.polyuser_id ? <Link to="/vendre"><Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>Vendre</Button></Link> : null}
              {user.polyuser_id ? <Link to="/messages"><Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>Messages</Button></Link> : null}
              <Link to="/profil"><Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block'}}>Profil</Button></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header