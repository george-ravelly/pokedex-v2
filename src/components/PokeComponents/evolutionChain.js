import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import PokemonSprite from "../PokemonSprite";

const EvolutionChain = ({url}) => {
    const [ evolution, setEvolution ] = useState(null);
    const [ not, setNot ] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const first =  data.chain.species.name;
                if(data.chain.evolves_to[0] !== undefined){
                    const second = data.chain.evolves_to[0].species.name;
                    if(data.chain.evolves_to[0].evolves_to[0] !== undefined){
                        const third = data.chain.evolves_to[0].evolves_to[0].species.name;
                        setEvolution([
                                {'sprite': first, 'trigger': true}, 
                                {'sprite': second, 'trigger': true}, 
                                {'sprite': third, 'trigger': false}
                            ])  
                        return;
                    }else{
                        setEvolution([
                            {'sprite': first, 'trigger': true}, 
                            {'sprite': second, 'trigger': false}
                        ])
                    }
                    
                }else {
                    setNot(false)
                    setEvolution(null)
                }
            }).catch(err => {
                console.log(err)
            })
    },[url])

    
    return (
        <div className="col-12">
            {evolution != null ? (
                <div className="row">
                    {evolution.map(result => (
                        <div className="col-12 d-flex justify-content-center align-items-center" key={result.sprite}>
                            {result.trigger ? (
                                <div className="w-50 mb-3" style={{textAlign: 'center'}}>
                                    <div style={{width : '50%'}}>
                                        <PokemonSprite url={'https://pokeapi.co/api/v2/pokemon-species/'+result.sprite} />
                                        <strong className="text-primary mt-2" style={{fontSize : '1.6rem', textAlign: 'center'}}>Evolve to</strong>                                        
                                    </div>
                                </div>
                            ): (
                                <div className="w-50">
                                    <div style={{width : '50%'}}>
                                        <PokemonSprite url={'https://pokeapi.co/api/v2/pokemon-species/'+result.sprite} />                                  
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}  
                </div>
            ) : (
                <div className="col-12">
                    {not ? (
                        <div 
                            className="d-flex justify-content-between align-items-center spinner-border text-primary" 
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <p className="col-12 text-secondary">
                            Not Evolve
                        </p>
                    )}
                </div>
            )}                         
        </div>
    )
}

export default EvolutionChain;