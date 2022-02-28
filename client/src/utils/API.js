// API call to get cocktails by search term (searching by name)
export const getCocktailsNameSearch = (query) => {
    return fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
}

// API call to get one random cocktail for home/search page
export const getRandomCocktail = () => {
    return fetch('www.thecocktaildb.com/api/json/v1/1/random.php');
}

// API call to get cocktails by ingredient (search this one if the name search returns no results)
export const getCocktailsIngredientSearch = (query) => {
    return fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?i=${query}`)
}

