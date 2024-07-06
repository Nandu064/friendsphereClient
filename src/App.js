import react, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Col, Row } from "reactstrap";
// import Header from "./components/Header";
import { AppContext } from "./context/AppContext";
import HeaderMob from "./components/HeaderMob";
import HeaderDes from "./components/HeaderDes";
import "./styles/index.scss";
import Header from "./components/Header";

function App() {
  const { user, platform } = useContext(AppContext);
  console.log("platform: ", platform);
  return (
    <div className="">
      <header className="">
        <Header />
      </header>
    </div>
  );
}

export default App;
