import React, { useEffect, useState } from "react";

import "./style.css"

const PokemonSprite = (props) => {
    const [ sprite, setSprite ] = useState({});
    const url = props.url;
    const [ isLoading, setLoading ] = useState(false)

    function selectSprite(id){
        fetch('http://pokeapi.co/api/v2/pokemon/'+id)
            .then(response => response.json())
            .then(data => {
                if(data.sprites.other.dream_world.front_default == null){
                    setSprite(data.sprites.front_default);
                }else {
                    setSprite(data.sprites.other.dream_world.front_default);
                }
            })
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                selectSprite(data.id);
            }
        ).catch(err => {
            console.log(err)
        })
        setLoading(true)
    }, [url]);


    return(
        <div style={{width: '100%', height: '100%'}}>
            {isLoading ? (
                <img src={sprite} alt="sprite" className="sprite"/>
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
};

export default PokemonSprite;
