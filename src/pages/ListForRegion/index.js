import React from "react";

import "./style.css";
import PokemonList from "../../components/PokemonList";
import Header from "../../components/Header";

function ListForRegion(){
    return(
        <main>
            <Header />
            <PokemonList />
            <footer className="text-center mt-2 bg-primary text-light p-3 mb-0">
                <p>
                    Este é o footer
                </p>
            </footer>
        </main>
    )
}

export default ListForRegion;