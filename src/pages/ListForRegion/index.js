import React, { useState, useEffect } from "react";
import PokemonSprite from "../../components/PokemonSprite";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import api from "../../services/api";
import { Link, useParams } from "react-router-dom";

import "./style.css";

function RegionListPokemon() {
    const { dex } = useParams();
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ pokedex, setPokedex ] = useState('');
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() => {
            api.get('pokedex/'+dex).then(response => {
                setPokedex(response.data.name);
                setPokemonList(response.data.pokemon_entries)
            }).catch(err => {
                console.log(err)
            }) 
    
        setLoading(true)
    }, [dex]);

    return(
        <main>
            <Header />
            {isLoading ? (
                <section className="container bg-light mt-2 p-4 list-pokemon rounded" >
                    <div className="d-flex justify-content-center">
                        <h1 className="text-dark text-capitalize">
                            <strong className="text-primary">#</strong>
                            {pokedex}
                        </h1>
                    </div>
                    <div className="container mt-5">  
                        <div className="row">                  
                        {pokemonList.map(pokemon => (
                            <div 
                                className="d-flex justify-content-around col-md-4 col-12 col-sm-6 mb-5 pokemon-list" 
                                key={pokemon.pokemon_species.name}
                            >
                                <div style={{width: '260px', height: '140px'}}>
                                    <PokemonSprite url={pokemon.pokemon_species.url}/><br />
                                </div>
                                <div className="car-body">
                                    <p className="card-title m-2 text-capitalize">
                                        {pokemon.pokemon_species.name}<br />
                                        <Link className="text-info" to={`/pokemon/${pokemon.pokemon_species.name}`}>info...</Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>  
            ) : (
                <div 
                    className="spinner-border text-primary d-flex justify-content-center align-center" 
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            <Footer />
        </main>
    )
}

export default RegionListPokemon;