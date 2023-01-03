import { h } from "preact";

import "./App.scss";
import BG from "./components/BG";
import StarMenu from "./components/StarMenu";

const App = () => {

    return (
        <div style={{ postition: "relative" }}>
            <StarMenu />
            <BG />
        </div>
    );
};

export default App;