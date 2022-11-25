import {useState, useEffect} from "react"

function Messages({user, setUser}) {

    const [convs, setConvs] = useState([])

    async function getConvs() {
        const res = await fetch(`http://localhost:5500/conv/${user.polyuser_id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setConvs(parseRes)
    }

    useEffect(() => {
        getConvs()
    },[])

    return (
        <div className="messages">
            <h1>Discussions</h1>
            <ul>

            </ul>
        </div>
    )
}

export default Messages