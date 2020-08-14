import React, { useState, useEffect } from "react";

function Description (props) {
    const { url } = props;
    const [ description, setDescription ] = useState('descrição');

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const flavor = data.flavor_text_entries;
                for(let i = 0; i < flavor.length; i++){
                    if(flavor[i].language.name === 'en'){
                        setDescription(flavor[i].flavor_text)
                    }
                }
            }).catch(err => {
                console.log(err)
            })
    }, [url]);

    return (
        <div>
            <span key={url}>{description}</span>
        </div>
    )
    
}
export default Description;