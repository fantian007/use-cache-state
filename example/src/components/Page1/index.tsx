import * as React from 'react';
import { useCacheState } from '../../../../.';

const cacheKey = Symbol();

const Page1 = () => {
  const [a, setA] = useCacheState(cacheKey, 1);

  return (
    <button onClick={() => { setA(a => a+ 1) }}>
      {a}
    </button>
  );
};

export default Page1;