import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Header"
import Home from "./Home"
import Error from "./Error"
import Profil from "./Profil"
import Vendre from "./Vendre"
import Notifs from "./Notifs"

function Main() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Error />} /> 
        <Route path="/notifs" element={<Notifs />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/vendre" element={<Vendre />} />
      </Routes>
    </Router>
  );
}

export default Main;
