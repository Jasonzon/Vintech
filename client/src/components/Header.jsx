import "../styles/Header.css"

function Header() {
    return (
        <div className="header">
            <h1 className="title">Vintech</h1>
            <nav className="nav">
                <h2>Vendre</h2>
                <h2>Notifs</h2>
                <h2>Profil</h2>
            </nav>
        </div>
    )
}

export default Header