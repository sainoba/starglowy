import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
// import csshake library
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
        console.log("clicks/sec", history.length);


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
                className={
                    `starglow1` +
                    ` ${clicksPerSecond >= 4 ? "shake shake-constant" : ""}` +
                    ` ${clicksPerSecond >= 8 ? "shake-hard" : ""}`
                }
                src={starglow}
                useMap="#starglow1-map" />
            <map name="starglow1-map">
                <area
                    onClick={() => {
                        setClicksHistory([...clicksHistory, Date.now()]);
                    }}
                    onTouchStart={() => {
                        setIsStarPressed(true);
                    }}
                    onTouchEnd={() => {
                        setIsStarPressed(false);
                    }}
                    onPointerDown={() => {
                        setIsStarPressed(true);
                    }}
                    onPointerUp={() => {
                        setIsStarPressed(false);
                    }}
                    onMouseDown={() => {
                        setIsStarPressed(true);
                    }}
                    onMouseUp={() => {
                        setIsStarPressed(false);
                    }}
                    target="#" coords="235,11,219,74,157,60,115,80,103,57,79,57,21,163,29,191,6,187,1,233,21,264,54,291,83,301,41,363,92,405,81,463,148,468,160,421,187,419,213,466,267,445,249,399,297,358,255,293,281,264,311,253,326,195,305,195,282,168,283,144,337,137,339,79,287,69,296,0,260,0" shape="poly" />
            </map>
        </div>
    );
};


export default StarMenu;
