import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import PokemonSprite from "../PokemonSprite";

const EvolutionChain = ({url}) => {
    const [ evolution, setEvolution ] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setEvolution({
                    'first': data.chain.species.name, 
                    'second': data.chain.evolves_to[0].species.name,
                    'third': data.chain.evolves_to[0].evolves_to[0].species.name
                })
            }).catch(err => {
                console.log(err)
            })
    },[url])

    
    return (
        <div>
            {evolution != null ? (
                <div className="d-flex justify-content-between" style={{width: '100%'}}>
                    <div className="col-2">
                        <PokemonSprite url={'http://pokeapi.co/api/v2/pokemon-species/'+evolution.first} />
                    </div>  
                    <div className="col-1">
                        <strong className="text-success" style={{fontSize: '4.5rem'}}>→</strong>
                    </div>
                    <div className="col-2">
                        <PokemonSprite url={'http://pokeapi.co/api/v2/pokemon-species/'+evolution.second} />
                    </div>  
                    <div className="col-1">
                        <strong className="text-success" style={{fontSize: '4.5rem'}}>→</strong>
                    </div>
                    <div className="col-2">
                        <PokemonSprite url={'http://pokeapi.co/api/v2/pokemon-species/'+evolution.third} />
                    </div> 
                </div>
            ) : (
                <div 
                    className="spinner-border text-primary d-flex justify-content-center align-center" 
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            )}
                                   
        </div>
    )
}

export default EvolutionChain;