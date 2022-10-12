import "../styles/Header.css"
import {Link} from "react-router-dom"

function Header() {
    return (
        <div className="header">
            <h1 className="title">Vintech</h1>
            <nav className="nav">
                <Link to="/vendre"><p>Vendre</p></Link>
                <Link to="/notifs"><p>Notifs</p></Link>
                <Link to="/profil"><p>Profil</p></Link>
            </nav>
        </div>
    )
}

export default Header