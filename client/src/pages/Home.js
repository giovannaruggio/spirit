import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_USERS } from '../utils/queries';

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_USERS);
  const cocktails = data?.cocktails || [];

  if (error) {
    console.log(JSON.parse(JSON.stringify(error)));
  }

  return (
    <main>
      <div className="flex-row justify-center">
        
      </div>
    </main>
  );
};

export default Home;
