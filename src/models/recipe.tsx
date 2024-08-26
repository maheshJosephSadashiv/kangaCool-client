import React from 'react';

export type Recipe = {
    id: number;
    title: string;
    image_url: string;
    cuisine: string;
    instructions: Array<string>;
    ingredients: Array<string>;
    is_favorite: boolean;
}
