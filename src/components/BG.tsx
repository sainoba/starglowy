import { createRef, h, Ref, RefObject } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import { useWindowSize } from "./WindowSize";

import "./BG.scss";

let ig_imgs = require('../assets/images/instagram_imgs/*.(jpg|webp|png)');


function* randomImageGenerator() {
    const random_order = [...Object.keys(ig_imgs)].sort(() => (Math.random() > 0.5 ? 1 : -1));
    let i = 0;
    while (true) {
        yield random_order[i % random_order.length];
        i = (i + 1) % random_order.length;
    }
}

const randomImageKeyGen = randomImageGenerator();

// interface 
interface ICardProps {
    imgKey: string;
    ref: RefObject<HTMLDivElement>;
    gridRow: string;
    gridColumn: string;
}

const Bg = () => {
    const [cardsState, setCardsState] = useState<ICardProps[]>([]);
    // const elementsRef = useRef([].map(() => createRef()));

    const cardsStateRef = useRef(cardsState);
    const [checkOverflowReq, setCheckOverflowReq] = useState(0);
    const [isOverflowning, setIsOverflowning] = useState(false);
    const windowSize = useWindowSize();

    const mosaicRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        changeDivBackground();
        checkOverflowing();
    }, []);

    useEffect(() => {
        cardsStateRef.current = cardsState;
    }, [cardsState]);

    useEffect(() => {
        checkOverflowing();
    }, [checkOverflowReq, windowSize]);

    function changeDivBackground(cardClicked: RefObject<HTMLDivElement> | null = null) {
        // choose random cardsState
        if (cardsStateRef.current.length === 0) {
            setTimeout(() => {
                changeDivBackground();
            }, 500);
            return;
        }

        let cardIdx = 0;

        // find cardIdx if cardClicked
        if (cardClicked) {
            cardIdx = cardsStateRef.current.findIndex(card => card.ref === cardClicked);
        } else {
            let isVisible = false;
            while (!isVisible) {
                cardIdx = Math.floor(Math.random() * cardsStateRef.current.length);
                const potentialCard = cardsStateRef.current[cardIdx];
                if (!potentialCard.ref.current) {
                    continue;
                }
                const rect = potentialCard.ref.current.getBoundingClientRect();
                isVisible = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
                if (!isVisible) {
                    // console.log("not visible");
                }
            }
        }

        // let card = cardsStateRef.current[cardIdx];
        const newImageKey = randomImageKeyGen.next().value as string;
        setCardsState(cardsState => {
            return cardsState.map((card, idx) => {
                if (idx === cardIdx) {
                    return {
                        ...card,
                        imgKey: newImageKey,
                    };
                }
                return card;
            });
        });

        if (!cardClicked) { // Was triggered by timeout, schedule again
            setTimeout(() => {
                changeDivBackground();
            }, 5000);
        }
    }

    function checkOverflowing() {
        if (!mosaicRef.current) {
            return
        }

        const mosaic = mosaicRef.current;
        // const isOverflowning = mosaic.scrollHeight > mosaic.clientHeight || mosaic.scrollWidth > mosaic.clientWidth;
        if (isOverflowning) {
            if (mosaic.scrollHeight > mosaic.clientHeight) { // still overflowing
                return;
            }
            setIsOverflowning(false);
        }

        addCard();
        const justOverflowed = mosaic.scrollHeight > mosaic.clientHeight;
        if (justOverflowed) {
            setIsOverflowning(true);
            const gridColumnCount = getComputedStyle(mosaic).gridTemplateColumns.split(" ").length;
            // add card for each column
            for (let i = 0; i < gridColumnCount * 2; i++) {
                addCard();
            }
        }

        setTimeout(() => {
            setCheckOverflowReq(checkOverflowReq + 1);
        }, 10);
    }

    function addCard() {
        setCardsState(cardsState => {
            const imgKey = randomImageKeyGen.next().value as string;
            return cardsState.concat({
                imgKey,
                ref: createRef<HTMLDivElement>(),
                gridRow: Math.random() > .6 ? "span 2 / auto" : "span 1 / auto",
                gridColumn: Math.random() > .6 ? "span 2 / auto" : "span 1 / auto",
            });
        });
    }


    return (
        <div className="image-mosaic" ref={mosaicRef}>
            {cardsState.map((card, idx) => {
                const imgUrl = ig_imgs[card.imgKey].webp || ig_imgs[card.imgKey].png || ig_imgs[card.imgKey].jpg;
                return (
                    <div
                        key={idx}
                        className="card"
                        ref={card.ref}
                        style={{
                            "backgroundImage": `url(${imgUrl})`,
                            "gridRow": card.gridRow,
                            "gridColumn": card.gridColumn,
                        }}
                        onClick={() => {
                            changeDivBackground(card.ref);
                        }}
                        onDragOver={() => {
                            changeDivBackground(card.ref);
                        }}
                        onDragOverCapture={() => {
                            changeDivBackground(card.ref);
                        }}
                        onMouseEnter={() => {
                            changeDivBackground(card.ref);
                        }}
                    >
                    </div>);
            })}
        </div>
    );
};

export default Bg;