import * as React from 'react';

const Page2 = () => {
  const [a, setA] = React.useState(1);

  return (
    <button onClick={() => { setA(a => a+ 1) }}>
      {a}
    </button>
  );
};

export default Page2;
