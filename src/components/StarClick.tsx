import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
// import csshake library
import "./StarClick.scss";
import "csshake/dist/csshake.min.css";



const starglow1 = require('../assets/images/starglow1.png');
const starglow2 = require('../assets/images/starglow2.png');
const starglow3 = require('../assets/images/starglow3.png');

const StarMenu = () => {
    const [isStarPressed, setIsStarPressed] = useState(false);
    const [clicksPerSecond, setClicksPerSecond] = useState(0);
    const [clicksHistory, setClicksHistory] = useState<number[]>([]);
    const refClicksHistory = useRef(clicksHistory);
    const [starglow, setStarglow] = useState(starglow1);


    function calculateClicksPerSecond() {
        const now = Date.now();
        const history = refClicksHistory.current.filter(t => now - t < 1000);
        setClicksHistory(history);
        setClicksPerSecond(history.length);

        if (history.length >= 8) {
            setStarglow(starglow3);
        }
        else if (history.length >= 4) {
            setStarglow(starglow2);
        } else {
            setStarglow(starglow1);
        }
    }

    useEffect(() => {
        refClicksHistory.current = clicksHistory;
    }, [clicksHistory]);


    useEffect(() => {
        setInterval(calculateClicksPerSecond, 500);
    }, []);


    // useEffect(() => {
    //     calculateClicksPerSecond();
    // }, [clicksHistory]);




    return (
        <div className={
            `star-menu ${isStarPressed ? "pressed" : ""}`
        }>
            <img
                draggable={false}
                className={
                    `starglow1` +
                    ` ${clicksPerSecond >= 4 ? "shake shake-constant" : ""}` +
                    ` ${clicksPerSecond >= 8 ? "shake-hard" : ""}`
                }
                src={starglow}
                onClick={() => {
                    setClicksHistory([...clicksHistory, Date.now()]);
                }}
                onPointerDown={() => {
                    setIsStarPressed(true);
                }}
                onPointerUp={() => {
                    setIsStarPressed(false);
                }}
            />
        </div>
    );
};


export default StarMenu;
