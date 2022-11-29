import Home from "./Home"

function Favoris({user, setUser}) {

    return (
        <Home user={user} setUser={setUser} prop={"fav"} />
    )

}

export default Favoris