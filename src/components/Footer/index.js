import React from "react";

const Footer = () => {
    return(
        <footer className="text-center mt-2 bg-primary text-light p-3 mb-0">
            <address>
                An <a href="http://github.com/George1050/pokedex-2.0" className="text-light font-weight-bold" target="_blank" rel="noopener noreferrer">open source site </a> 
                by <a href="http://github.com/George1050" target="_blank" className="text-light font-weight-bold" rel="noopener noreferrer">George Ribeiro</a>, with help from Pokeapi.
                <br/> 
                All content is © Nintendo, Game Freak, and The Pokémon Company.
            </address>
        </footer>
    )
};

export default Footer;