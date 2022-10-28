import "../styles/User.css"
import {useState} from "react"

function User({user, setUser}) {

    function logout() {
        localStorage.removeItem("token")
        setUser({})
    }

    const [modify, setModify] = useState(false)
    const [inputs, setInputs] = useState({pseudo:user.polyuser_name,description:user.polyuser_description,city:user.polyuser_city})

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
            <div className="connection">
                <h1>Mon compte</h1>
            </div>
            <div className="perso">
                <div className="pers">
                    {modify ? <button style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}} title="annuler" onClick={() => {setModify(false);setInputs({pseudo:user.polyuser_name,description:user.polyuser_description})}}>Annuler</button> : <button style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}} onClick={() => setModify(true)}>Modifier</button>}
                    {modify ? <button style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}} title="valider" onClick={() => update()}>Valider</button> : null}
                </div>
                <div className="ddiv">
                    <label>Pseudo :</label>
                    {modify ? <input maxLength="20" className="user1" value={inputs.pseudo} onChange={(e) => setInputs({pseudo:e.target.value.replace(/[^a-zA-Z0-9]/g,'').replace(/\s+/g, ''), description:inputs.description, city:inputs.city})}/> : <p>{user.polyuser_name} {"#"+("000"+user.polyuser_id).slice(-4)}</p>}
                </div>
                <div className="ddiv">
                    <label>Mail :</label>
                    <p>{user.polyuser_mail}</p>
                </div>
                <div className="ddiv">
                    <label>Ville :</label>
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
                    </select> : <p>{user.polyuser_city}</p> }
                </div>
                <div className="ddiv">
                    <label>Role :</label>
                    <p>{user.polyuser_role}</p>
                </div>
                <div className="ddiv">
                    <label>Description :</label>
                    {modify ? <input className="user3" maxLength="30" value={inputs.description} onChange={(e) => setInputs({pseudo:inputs.pseudo, description:e.target.value, city:inputs.city})}/> : <p>{user.polyuser_description}</p>}
                </div>
            </div>
            {modify ? null : <button onClick={() => logout()} style={user.polyuser_name ? {backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`} : {backgroundColor:"var(--basic)"}}>Se déconnecter</button> }
        </div>
    )
}

export default User