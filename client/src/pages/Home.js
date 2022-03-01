import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import SingleCocktail from '../components/SingleCocktail';
import { QUERY_USERS } from '../utils/queries';
import { getRandomCocktail } from '../utils/API';

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
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <h3>Random cocktail:</h3>
        <SingleCocktail cocktail={randomCocktail} />
      </div>
    </main>
  );
};

export default Home;
