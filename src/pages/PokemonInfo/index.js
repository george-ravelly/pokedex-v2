import React from "react";
import PokemonItem from "../../components/PokemonItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";


function PokemonInfo (){
    return(
        <main>
            <Header />
            <PokemonItem />
            <Footer />
        </main>
    )    
}


export default PokemonInfo;