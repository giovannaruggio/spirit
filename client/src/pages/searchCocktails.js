import * as React from 'react';
import { useMutation } from '@apollo/client';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getCocktailsNameSearch } from '../utils/API';
import { ADD_COCKTAIL, ADD_INGREDIENT } from '../utils/mutations';

export default function SearchCocktail() {

  const [itemData, setItemData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [addCocktail] = useMutation(ADD_COCKTAIL);
  const [addIngredient] = useMutation(ADD_INGREDIENT);

  const handleInputChange = (e) => {
    const { value } = e.target;
    return setSearchTerm(value);
  }


  const searchCocktailDB = async (event) => {
    event.preventDefault();
    // search cocktailDB
    const results = await getCocktailsNameSearch(searchTerm);
    const newItemData = await results.drinks.map(drink => {
      // combigning the ingredients/measures into one array for the newDrink object
      const ingredients = [];
      for (let i = 1; i < 16; i++) {
        const ingrName = drink[`strIngredient` + i];
        let measureName = drink[`strMeasure` + i];
        if (ingrName === null) {
          break;
        }
        if (measureName === null) {
          measureName = '';
        }
        const newIngredient = {
          ingredient: ingrName,
          measure: measureName,
        }
        ingredients.push(newIngredient);
      }

      // pulling data for each drink
      const newDrink = {
        name: drink.strDrink,
        img: drink.strDrinkThumb,
        isAlcoholic: drink.strAlcoholic === 'Alcoholic' ? true : false,
        instructions: drink.strInstructions,
        ingredients,
      }
      return newDrink;
    });
    setItemData(newItemData);
  }

  const saveToDB = async (event) => {
    const drinkIndex = event.target.dataset.drink;
    const drink = itemData[drinkIndex];
    // Save drink to the database
    let newCocktail = await addCocktail({ variables: { name: drink.name, instructions: drink.instructions, image: drink.img, isAlcoholic: drink.isAlcoholic } });
    console.log(newCocktail);
    // using the created Cocktail's _id, loop through the ingredients array and add ingredients/measures to the database
    // const returnData = await drink.ingredients.map(item => {
    //   newCocktail = addIngredient({ variables: { cocktailId: newCocktail._id, ingredient: item.ingredient, measure: item.measure } });
    //   return newCocktail;
    // })
    // console.log(returnData);
  }

  return (
    <>
      <form>
        <input value={searchTerm} name="searchTerm" onChange={handleInputChange} type="text"></input>
        <button type="button" onClick={searchCocktailDB}>
          Search for a cocktail
        </button>
      </form>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item, index) => (
          <div key={item.img}>
            <button type="button" onClick={saveToDB} data-drink={index}>{item.name}</button>
            <ImageListItem>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
    </>
  );
}