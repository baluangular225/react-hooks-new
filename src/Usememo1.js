import React, { useMemo, useState } from 'react';

const Usememo1 = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubledNumber = useMemo(() => {
    return slowFunction(number); // This will only recompute when 'number' changes.
  }, [number]);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black',
    };
  }, [dark]);

  return (
    <div className="container">
      <h1>Usememo1</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>Updated number (doubled): {doubledNumber}</p>
      <div style={themeStyles}>
        <p>Hello Pavan</p>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => setDark(!dark)}
      >
        Change Theme
      </button>
    </div>
  );
};

const slowFunction = (number) => {
  // Simulating a slow operation (e.g., computation-heavy task)
  for (let i = 0; i < 1; i++) {} // A bigger loop for simulation
  console.log('Slow function executed');
  return number * 2; // Simplified operation: doubling the number
};

export default Usememo1;
