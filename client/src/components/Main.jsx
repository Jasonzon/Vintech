import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Header"
import Home from "./Home"
import Error from "./Error"

function Main() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default Main;
