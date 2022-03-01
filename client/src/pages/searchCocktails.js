import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getCocktailsNameSearch } from '../utils/API';

export default function SearchCocktail() {

  const [itemData, setItemData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

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

    // pulling data for each drink
    const newDrink = {
      name: drink.strDrink,
      img: drink.strDrinkThumb,
      isAlcoholic: drink.strAlcoholic,
      instructions: drink.strInstructions,
      ingredients,
    }
    return newDrink;
  });
  setItemData(newItemData);
}

// itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//   },
// ];


  return (
    <>
      <form>
        <input value={searchTerm} name="searchTerm" onChange={handleInputChange} type="text"></input>
        <button type="button" onClick={searchCocktailDB}>
          Search for a cocktail
        </button>
      </form>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}