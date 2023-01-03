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
    const [maxClicksPerSecond, setMaxClicksPerSecond] = useState(parseInt(localStorage.getItem("maxClicksPerSecond") || "0"));
    const refMaxClicksPerSecond = useRef(maxClicksPerSecond);
    const [clicksHistory, setClicksHistory] = useState<number[]>([]);
    const refClicksHistory = useRef(clicksHistory);
    const [starglow, setStarglow] = useState(starglow1);
    const [showScore, setShowScore] = useState(false);


    function calculateClicksPerSecond() {
        const now = Date.now();
        const history = refClicksHistory.current.filter(t => now - t < 1000);
        setClicksHistory(history);
        setClicksPerSecond(history.length);
        if (history.length > refMaxClicksPerSecond.current) {
            localStorage.setItem("maxClicksPerSecond", history.length.toString());
        }
        setMaxClicksPerSecond(Math.max(refMaxClicksPerSecond.current, history.length));

        if (history.length >= 8) {
            setStarglow(starglow3);
        }
        else if (history.length >= 4) {
            setStarglow(starglow2);
            setShowScore(true);
        } else {
            setStarglow(starglow1);
        }
    }
    useEffect(() => {
        refMaxClicksPerSecond.current = maxClicksPerSecond;
    }, [maxClicksPerSecond]);

    useEffect(() => {
        refClicksHistory.current = clicksHistory;
    }, [clicksHistory]);


    useEffect(() => {
        setInterval(calculateClicksPerSecond, 500);
    }, []);


    return (
        <div class="star-menu-wrapper">
            <div className={`star-menu ${isStarPressed ? "pressed" : ""}`}
                onClick={() => {
                    console.log("click");
                    setClicksHistory([...clicksHistory, Date.now()]);
                }}
                onPointerDown={() => {
                    setIsStarPressed(true);
                }}
                onPointerUp={() => {
                    setIsStarPressed(false);
                }}
            >
                <img
                    draggable={false}
                    className={
                        `starglow1` +
                        ` ${clicksPerSecond >= 4 ? "shake shake-constant" : ""}` +
                        ` ${clicksPerSecond >= 8 ? "shake-hard" : ""}`
                    }
                    src={starglow}
                />
            </div>
            <div
                className={`click-stats ${showScore ? "" : "hidden"}`}
            >
                <div class="close-btn"
                    onClick={() => {
                        setShowScore(false);
                    }}
                >X</div>
                <div>Max clicks/second: {maxClicksPerSecond}</div>
                <div>Clicks/second: {clicksPerSecond}</div>
            </div>
        </div>
    );
};


export default StarMenu;
