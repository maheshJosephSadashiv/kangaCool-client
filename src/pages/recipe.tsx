
import React from 'react';

export default function RecipePage(props: { params: { id: string}}) {
    return (
        <div>
            <h1>Recipe {props.params.id}</h1>
        </div>
    )
}