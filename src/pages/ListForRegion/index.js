import React from "react";

import "./style.css";
import PokemonList from "../../components/PokemonList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ListForRegion(){
    return(
        <main>
            <Header />
            <PokemonList />
            <Footer />
        </main>
    )
}

export default ListForRegion;