import React from 'react';

// Takes an object (a single drink) and forms the card display with data in relevent locations

const SingleCocktail = ({ cocktail }) => {
    return (
        <div>
        <h5>{cocktail.strDrink}</h5><br></br>
        <p>{cocktail.strInstructions}</p>
        <img src={cocktail.strDrinkThumb}></img>
        </div>
    )
}

export default SingleCocktail;