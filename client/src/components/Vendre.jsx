import "../styles/Vendre.css"
import {categories} from "../utils/categories"
import {useState} from "react"

function Vendre({user, setUser}) {

    const [selectedCategories, setSelectedCategories] = useState([])

    function addCategory(category) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((catego) => catego !== category))
        }
        else if (selectedCategories.length < 3) {
            setSelectedCategories([category, ...selectedCategories])
        }
    }

    async function post() {

    }

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
                <h3>Categories (3max)</h3>
                <ul>
                    {categories.map((category) => 
                        <li key={category}>
                            <label for={category} >{category}</label>
                            <input checked={selectedCategories.includes(category)} id={category} type="checkbox" onClick={() => addCategory(category)} />
                        </li>
                    )}
                </ul>
                <button type="submit" style={{backgroundColor:`var(--${user.polyuser_city.toLowerCase()})`}} onClick={() => post()} >Valider</button>
            </form>
        </div>
    )
}

export default Vendre