import {Link} from "react-router-dom"

function Header({user, setUser}) {
    return (
        <div className="header" style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}}>
            <Link to="/"><h1 className="title">Vintech</h1></Link>
            <nav className="nav">
                {user.polyuser_name ? <Link to="/vendre"><p>Vendre</p></Link> : null }
                {user.polyuser_name ? <Link to="/messages"><p>Messages</p></Link> : null }
                <Link to="/profil"><p>Profil</p></Link>
            </nav>
        </div>
    )
}

export default Header