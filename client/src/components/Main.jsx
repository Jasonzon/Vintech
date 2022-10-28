import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Header"
import Home from "./Home"
import Error from "./Error"
import Profil from "./Profil"
import Vendre from "./Vendre"
import Messages from "./Messages"
import {useState, useEffect} from "react"

function Main() {

  const [user, setUser] = useState({})
  const [connection, setConnection] = useState(true)

  async function auth() {
      if (localStorage.token) {
          const res = await fetch("http://localhost:5500/polyuser/auth", {
              method: "GET",
              headers: {token: localStorage.token}
          })
          const parseRes = await res.json()
          const res2 = await fetch(`http://localhost:5500/polyuser/id/${parseRes.polyuser_id}`, {
              method: "GET"
          })
          const parseRes2 = await res2.json()
          setUser({polyuser_id:parseRes2.polyuser_id,polyuser_role:parseRes2.polyuser_role,polyuser_mail:parseRes.polyuser_mail,polyuser_description:parseRes2.polyuser_description,polyuser_name:parseRes2.polyuser_name,polyuser_city:parseRes2.polyuser_city})
      }
  }

  useEffect(() => {
      auth()
  },[])

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route exact path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="*" element={<Error />} /> 
        <Route path="/messages" element={<Messages user={user} setUser={setUser} />} />
        <Route path="/profil" element={<Profil user={user} setUser={setUser} connection={connection} setConnection={setConnection} />} />
        <Route path="/vendre" element={<Vendre user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default Main;
