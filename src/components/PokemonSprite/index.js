import React, { useEffect, useState } from "react";

import "./style.css"

const PokemonSprite = (props) => {
    const [ sprite, setSprite ] = useState({});
    const name = props.name;

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/'+name)
            .then(response => response.json())
            .then(data => {
                if(data.sprites.other.dream_world.front_default != null){
                    setSprite(data.sprites.other.dream_world.front_default);
                }else {
                    setSprite(data.sprites.front_default);
                }                
            })
    }, [name])
    return(
        <div className="sprite-content">
            <img src={sprite} alt="sprite" className="sprite"/>
        </div>
    )
};

export default PokemonSprite;
