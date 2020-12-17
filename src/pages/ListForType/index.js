import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PokemonSprite from "../../components/PokemonSprite";

import api from "../../services/api";
import { Link, useParams } from "react-router-dom";

import "./style.css";

function ListForType() {
    const { type } = useParams();
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() => {
            api.get('type/'+type).then(response => {
                setPokemonList(response.data.pokemon)
            }).catch(err => {
                console.log(err)
            }) 
    
        setLoading(true)
    }, [type]);

    return(
        <main>
            <Header />
            {isLoading ? (
                <section className="container bg-light mt-2 p-4 list-pokemon rounded" >
                    <div className="d-flex justify-content-center">
                        <h1 className="text-dark text-capitalize">
                            <strong className="text-primary">#</strong>
                            {type}
                        </h1>
                    </div>
                    <div className="container mt-5">  
                        <div className="row">                  
                        {pokemonList.map(pokemon => (
                            <div className="col-md-4 col-12 mb-3 mb-md-1 d-flex justify-content-center" key={pokemon.pokemon.name}>
                                <Link className="text-decoration-none mb-3" to={`/pokemon/${pokemon.pokemon.name}`}>
                                    <div style={{width: '175px', height: '175px'}}>
                                        <PokemonSprite url={pokemon.pokemon.url}/><br />
                                    </div>
                                    <strong className="p-4 text-capitalize" style={{fontSize: '1.4rem'}}>
                                        {pokemon.pokemon.name}
                                    </strong>
                                </Link>
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

export default ListForType;