import * as React from 'react';
import { useCacheState } from '../../../../.';

const cacheKey = 'a1';

const Page1 = () => {
  const [a, setA, loading] = useCacheState(cacheKey, 12, {
    persist: {
      'mode': 'localforage'
    }
  });

  console.log('__page', loading, a);

  if (loading) {
    return <span>loading....</span>;
  }

  return (
    <button onClick={() => {
      setA(a => {
        if (a) {
          return a + 1;
        }
      })
    }}>
      {a}
    </button>
  );
};

export default Page1;