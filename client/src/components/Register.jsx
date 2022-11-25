
import {useState} from "react"

function Register({connection, setConnection, user, setUser}) {

    const [inputs, setInputs] = useState({
        mail:"",
        pseudo:"",
        password:"",
        polytech:""
    })

    const [holder, setHolder] = useState("")

    async function submit(e) {
        e.preventDefault()
        const res = await fetch(`http://localhost:5500/polyuser/mail/${inputs.mail}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        if (parseRes.length === 0) {
            const body = {mail:inputs.mail, name:inputs.pseudo, password:inputs.password,polytech:inputs.polytech}
            const res2 = await fetch("http://localhost:5500/polyuser", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
            const parseRes2 = await res2.json()
            localStorage.setItem("token",parseRes2.token)
            setUser(parseRes2.rows[0])
        }
        else {
            e.target.form[0].value=""
            setHolder("Mail déjà utilisé")
        }
    }

    return (
        <div className="regg">
            <div className="connection">
                <h1>Enregistrement</h1>
                <button onClick={() => setConnection(true)}>Déjà inscrit ?</button>
            </div>
            <form>
                <div>
                    <label>Mail</label>
                    <input placeholder={holder} maxLength="100" required onChange={(e) => {setInputs({mail:e.target.value, pseudo:inputs.pseudo, password:inputs.password, polytech:inputs.polytech});setHolder("")}} value={inputs.mail} type="email" id="email" name="email"/>
                </div>
                <div>
                    <label>Pseudo</label>
                    <input required maxLength="20" onChange={(e) => setInputs({mail:inputs.mail, pseudo:e.target.value.replace(/[^a-zA-Z0-9 ]/g,''), password:inputs.password, polytech:inputs.polytech})} value={inputs.pseudo} type="text" id="epseudo" name="epseudo"/>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input required maxLength="50" onChange={(e) => setInputs({mail:inputs.mail, pseudo:inputs.pseudo, password:e.target.value, polytech:inputs.polytech})} value={inputs.password} type="password" id="epassword" name="epassword"/>
                </div>
                <div>
                    <label>Polytech</label>
                    <select required onChange={(e) => setInputs({mail:inputs.mail, pseudo:inputs.pseudo, password:inputs.password, polytech:e.target.value})} value={inputs.polytech} type="text" id="epolytech" name="epolytech">
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
                    </select>
                </div>
                <button className="sub" type="submit" onClick={(e) => submit(e)}>S'enregistrer</button>
            </form>
        </div>
    )
}

export default Register