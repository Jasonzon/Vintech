import "../styles/User.css"
import {useState, useEffect} from "react"
import Article from "./Article"

function User({user, setUser}) {

    function logout() {
        localStorage.removeItem("token")
        setUser({})
    }

    const [articles, setArticles] = useState([])
    const [modify, setModify] = useState(false)
    const [inputs, setInputs] = useState({pseudo:user.polyuser_name,description:user.polyuser_description,city:user.polyuser_city})

    async function getArticles() {
        const res = await fetch(`http://localhost:5500/article/polyuser/${user.polyuser_id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setArticles(parseRes)
    }

    useEffect(() => {
        getArticles()
    },[])

    async function update() {
        if (inputs.pseudo !== "") {
            const body = {mail:user.polyuser_mail,role:user.polyuser_role,name:inputs.pseudo,description:inputs.description,city:inputs.city}
            const res2 = await fetch(`http://localhost:5500/polyuser/${user.polyuser_id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json",token: localStorage.token},
                body:JSON.stringify(body)
            })
            const parseRes2 = await res2.json()
            setModify(false)
            setUser({polyuser_id:parseRes2.polyuser_id,polyuser_role:parseRes2.polyuser_role,polyuser_mail:user.polyuser_mail,polyuser_description:parseRes2.polyuser_description,polyuser_name:parseRes2.polyuser_name,polyuser_city:parseRes2.polyuser_city})
        }
    }

    return (

        <div className="user">
            <div className="left">
                <div className="top">
                    <img alt="photo de profil" src="https://media.istockphoto.com/vectors/default-avatar-profile-icon-vector-vector-id1337144146?b=1&k=20&m=1337144146&s=170667a&w=0&h=ys-RUZbXzQ-FQdLstHeWshI4ViJuEhyEa4AzQNQ0rFI=" />
                    <div className="pseudo">
                    {modify ? <input maxLength="20" className="user1" value={inputs.pseudo} onChange={(e) => setInputs({pseudo:e.target.value.replace(/[^a-zA-Z0-9]/g,'').replace(/\s+/g, ''), description:inputs.description, city:inputs.city})}/> : <h2>{user.polyuser_name}</h2>}
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="modify">
                        {modify ? <button style={{backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`}} title="annuler" onClick={() => {setModify(false);setInputs({pseudo:user.polyuser_name,description:user.polyuser_description,city:user.polyuser_city})}}>Annuler</button> : <button style={{backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`}} onClick={() => setModify(true)}>Modifier</button>}
                        {modify ? <button style={{backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`}} title="valider" onClick={() => update()}>Valider</button> : null}
                    </div>
                    <div className="ville">
                    {modify ? <select required onChange={(e) => setInputs({pseudo:inputs.pseudo, city:e.target.value, description:inputs.description})} value={inputs.city} type="text" id="epolytech" name="epolytech">
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
                     </select> : <h3>{user.polyuser_city}</h3> }
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                    </div>
                    <div className="description">
                    {modify ? <input className="user3" maxLength="30" value={inputs.description} onChange={(e) => setInputs({pseudo:inputs.pseudo, description:e.target.value, city:inputs.city})}/> : <h3>{user.polyuser_description}</h3>}
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                    </div>
                    {modify ? null : <button onClick={() => logout()} style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}}>Se déconnecter</button> }
                </div>
            </div>
            <div className="cut"></div>
            <div className="right">
                <h2>Articles en vente</h2>
                <ul className="articles">
                    {articles.map(({article_id,article_pic, article_title, article_description, created_at, article_polyuser, article_price, article_city}) => 
                        <Article key={article_title}
                            pic={article_pic}
                            title={article_title}
                            description={article_description}
                            created_at={created_at}
                            polyuser={article_polyuser}
                            price={article_price}
                            city={article_city}
                            id={article_id}
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default User