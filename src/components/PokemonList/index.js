import React, { useState, useEffect } from "react";
import PokemonSprite from "../../components/PokemonSprite";

import api from "../../services/api";
import { Link, useParams } from "react-router-dom";

import "./style.css";

function PokemonList() {
    const { dex } = useParams();
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ pokedex, setPokedex ] = useState({})

    useEffect(() => {(
        api.get('pokedex/'+dex).then(response => {
            setPokedex(response.data);
            setPokemonList(response.data.pokemon_entries)
        })
        
    )}, [pokemonList, dex]);

    return(
        <section className="container bg-light mt-2 p-4 list-pokemon rounded" >
            <div className="d-flex justify-content-center">
                <h1 className="text-dark text-capitalize">
                    <strong className="text-primary">#</strong>
                    {pokedex.name}
                </h1>
            </div>
            <div className="container mt-5">  
                <div className="row">                  
                {pokemonList.map(pokemon => (
                    <div 
                        className="d-flex justify-content-around col-3 mb-5 pokemon-list" 
                        key={pokemon.pokemon_species.name}
                    >
                        <PokemonSprite name={pokemon.pokemon_species.name} />
                        <div className="car-body">
                            <p className="card-title m-2 text-capitalize">
                                {pokemon.pokemon_species.name}<br />
                                <Link className="text-info" to={`/pokemon?name=${pokemon.pokemon_species.name}`}>info...</Link>
                            </p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </section>  
    )
}

export default PokemonList;