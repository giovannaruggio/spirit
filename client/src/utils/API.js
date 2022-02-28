// API call to get cocktails by search term (searching by name)
export const getCocktailsNameSearch = async (query) => {
    const returnData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
    const parsedData = await returnData.json();
    return parsedData;
}

// API call to get one random cocktail for home/search page
export const getRandomCocktail = async () => {
    const returnData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const parsedData = await returnData.json();
    return parsedData;
}

// API call to get cocktails by ingredient (search this one if the name search returns no results)
export const getCocktailsIngredientSearch = async (query) => {
    const returnData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${query}`);
    const parsedData = await returnData.json();
    return parsedData;
}
