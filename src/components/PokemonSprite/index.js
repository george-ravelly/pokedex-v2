import React, { useEffect, useState } from "react";

import "./style.css"

const PokemonSprite = (props) => {
    const [ sprite, setSprite ] = useState({});
    const url = props.url;

    function spriteFormSwitchable(id){
        fetch("https://pokeapi.co/api/v2/pokemon/"+id)
            .then(response => response.json())
            .then(data => {
                if(data.sprites.other.dream_world.front_default == null){
                    setSprite(data.sprites.front_default);
                }else {
                    setSprite(data.sprites.other.dream_world.front_default);
                } 
            }
        )
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.forms_switchable === null){
                    if(data.sprites.other.dream_world.front_default != null){
                        setSprite(data.sprites.front_default);
                    }else {
                        setSprite(data.sprites.other.dream_world.front_default);
                    } 
                }else {
                    spriteFormSwitchable(data.id);
                }
                               
            }
        )
    }, [url]);
    return(
        <div style={{width: '100%', height: '100%'}}>
            <img src={sprite} alt="sprite" className="sprite"/>
        </div>
    )
};

export default PokemonSprite;
