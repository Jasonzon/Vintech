import Connection from "./Connection"
import Register from "./Register"
import User from "./User"

function Profil({user, setUser, connection, setConnection}) {

    return (
        <div className="profil">
            {!user.polyuser_name ? <> {connection ? 
                <Connection connection={connection} setConnection={setConnection} user={user} setUser={setUser}/> : 
                <Register connection={connection} setConnection={setConnection} user={user} setUser={setUser} /> } </> : 
                <User user={user} setUser={setUser} /> }
        </div>
    )
}

export default Profil