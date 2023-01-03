import { h } from "preact";

import "./Menu.scss";


const Menu = () => {

    return (
        <div className="main-menu">
            <a className="item" href="https://www.twitch.tv/starglowy">
                <i class="fa-brands fa-twitch" />
                <span>Twitch</span>
            </a>
            <a className="item" href="https://www.instagram.com/star.glow/">
                <i class="fa-brands fa-square-instagram" />
                <span>Instagram</span>
            </a>
            <a className="item" href="https://twitter.com/StarGlowTweet">
                <i class="fa-brands fa-twitter" />
                <span>Twitter</span>
            </a>
            <a className="item" href="https://www.patreon.com/starglow">
                <i class="fa-brands fa-patreon" />
                <span>Patreon</span>
            </a>
            <a className="item" href="https://www.tiktok.com/@starglowy">
                <i class="fa-brands fa-tiktok" />
                <span>Tiktok</span>
            </a>
            <a className="item" href="https://ko-fi.com/starglow">
                <i class="fa-solid fa-mug-hot" />
                <span>Kofi</span>
            </a>
        </div>
    );
}



export default Menu;
