import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Description = ({name}) => {
    const [ genus, setGenus ] = useState('');
    const [ description, setDescription ] = useState('');

    useEffect(() => {
        fetch('http://pokeapi.co/api/v2/pokemon-species/'+name)
            .then(response => response.json())
            .then(data => {
                const text = data.genera.filter(el => {
                    return el.language.name === 'en'
                }) 
                setGenus(text[0].genus)
                const description = data.flavor_text_entries.filter(el => {
                    return el.language.name === 'en'
                }) 
                setDescription(description[0].flavor_text)
            })
    },[name])
    return (
        <div className="text-secondary mr-2">
            <h3>{genus}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Description;