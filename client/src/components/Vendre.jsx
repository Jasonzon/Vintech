import "../styles/Vendre.css"

function Vendre({user, setUser}) {

    return (
        <div className="vendre">
            <h1>Ajouter un article</h1>
            <form>
                <div>
                    <label>Titre</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Prix</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Image</label>
                    <input type="file"></input>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text"></input>
                </div>
                <button type="submit" style={{backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`}}>Valider</button>
            </form>
        </div>
    )
}

export default Vendre