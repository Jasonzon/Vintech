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
            const body = {name:inputs.pseudo,description:inputs.description,city:inputs.city}
            const res2 = await fetch(`http://localhost:5500/polyuser/id/${user.polyuser_id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json",token: localStorage.token},
                body:JSON.stringify(body)
            })
            const parseRes2 = await res2.json()
            setModify(false)
            setUser({polyuser_id:parseRes2.polyuser_id,polyuser_role:parseRes2.polyuser_role,polyuser_mail:user.polyuser_mail,polyuser_description:parseRes2.polyuser_description,polyuser_name:parseRes2.polyuser_name})
        }
    }

    return (
        <div className="user">
            <div className="connection">
                <h1>Mon compte</h1>
            </div>
            <div className="perso">
                <div className="pers">
                    {modify ? <button title="annuler" onClick={() => {setModify(false);setInputs({pseudo:user.polyuser_name,description:user.polyuser_description})}}>Annuler</button> : <button onClick={() => setModify(true)}>Modifier</button>}
                    {modify ? <button title="valider" onClick={() => update()}>Valider</button> : null}
                </div>
                <div className="ddiv">
                    <label>Pseudo :</label>
                    {modify ? <input maxLength="20" className="user1" value={inputs.pseudo} onChange={(e) => setInputs({pseudo:e.target.value.replace(/[^a-zA-Z0-9]/g,'').replace(/\s+/g, ''), description:inputs.description})}/> : <p>{user.polyuser_name} {"#"+("000"+user.polyuser_id).slice(-4)}</p>}
                </div>
                <div className="ddiv">
                    <label>Mail :</label>
                    <p>{user.polyuser_mail}</p>
                </div>
                <div className="ddiv">
                    <label>Ville :</label>
                    {modify ? <select required onChange={(e) => setInputs({pseudo:inputs.pseudo, city:e.target.value, description:inputs.description})} value={inputs.polytech} type="text" id="epolytech" name="epolytech">
                        <option value="" disabled selected>Choisir une ville</option>
                        <option className="montpellier" value="Montpellier">Montpellier</option>
                        <option className="savoie" value="Savoie">Savoie</option>
                        <option className="marseille" value="Marseille">Marseille</option>
                        <option className="nice" value="Nice">Nice</option>
                        <option className="grenoble" value="Grenoble">Grenoble</option>
                        <option className="lyon" value="Lyon">Lyon</option>
                        <option className="clermont" value="Clermont">Clermont</option>
                        <option className="sorbonne" value="Sorbonne">Sorbonne</option>
                        <option className="saclay" value="Saclay">Saclay</option>
                        <option className="lille" value="Lille">Lille</option>
                        <option className="nancy" value="Nancy">Nancy</option>
                        <option className="tours" value="Tours">Tours</option>
                        <option className="orleans" value="Orleans">Orleans</option>
                        <option className="angers" value="Angers">Angers</option>
                        <option className="nantes" value="Nantes">Nantes</option>
                    </select> : <p>{user.polyuser_city}</p> }
                </div>
                <div className="ddiv">
                    <label>Role :</label>
                    <p>{user.polyuser_role}</p>
                </div>
                <div className="ddiv">
                    <label>Description :</label>
                    {modify ? <input className="user3" maxLength="150" value={inputs.description} onChange={(e) => setInputs({pseudo:inputs.pseudo, description:e.target.value})}/> : <p>{user.polyuser_description}</p>}
                </div>
            </div>
            <button onClick={() => logout()}>Se déconnecter</button>
        </div>
    )
}

export default User