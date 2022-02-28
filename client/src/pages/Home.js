import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_USERS } from '../utils/queries';
import { getCocktailsNameSearch, getCocktailsIngredientSearch, getRandomCocktail } from '../utils/API';

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_USERS);
  const cocktails = data?.cocktails || [];

  const [ randomCocktail, setRandomCocktail ] = useState({});

  if (error) {
    console.log(JSON.parse(JSON.stringify(error)));
  }

  useEffect(() => {
    const testData = testCocktailDB();
  }, []);

  const testCocktailDB = async (query) => {
    const first = await getRandomCocktail();
    const second = first.drinks[0];
    setRandomCocktail(second);
    console.log(randomCocktail);

  }

 

  return (
    <main>
      <div className="flex-row justify-center">
        <p>Random Drink:  {randomCocktail.strDrink}</p>
      </div>
    </main>
  );
};

export default Home;
