import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import pokeball from "../../assets/image/pokebola.png"

const Header = () => {
    return(
        <header>
            <div className="header-content">
                <Link className="header text-decoration-none" to="/">
                    Pokedéx
                    <img src={pokeball} alt="pokebola"/>
                </Link>
            </div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/1">All Region <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/2">Kanto <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/6">Jotho <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/4">Hoenn <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/5">Sinnoh <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/9">Unova <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/12">Kalos <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/region/21">Alola <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;