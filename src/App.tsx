import { h } from "preact";

import "./css/reset.scss";
import "./App.scss";
import BG from "./components/BG";
import StarClick from "./components/StarClick";
import Menu from "./components/Menu";

const App = () => {

    return (
        <div style={{ postition: "relative" }}>
            <Menu />
            <StarClick />
            <BG />
        </div>
    );
};

export default App;