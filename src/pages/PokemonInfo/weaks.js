import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Weaks({url}) {
    
    const [ doubleDamage, setDoubleDamage ] = useState([]);
    const [ halfDamage, setHalfDamage ] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setDoubleDamage(data.damage_relations.double_damage_from);
                setHalfDamage(data.damage_relations.half_damage_from);
            })
            .catch(err => {
                console.log(err)
            })
    }, [url])
    return(
        <tr>
            <td>
                {doubleDamage.map(results => (
                    <strong 
                        key={results.url}
                        className="rounded text-uppercase p-2 m-1 text-light d-inline-block" 
                        style={{background: `var(--color-${results.name})`}}
                        
                    >
                        {results.name}
                    </strong>
                ))}
            </td>
            <td>
                {halfDamage.map(results => (
                    <strong 
                        key={results.url}
                        className="rounded text-uppercase p-2 m-1 text-light d-inline-block" 
                        style={{background: `var(--color-${results.name})`}}
                        
                    >
                        {results.name}
                    </strong>
                ))}
            </td>
        </tr>
    )
}