/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo, useCallback, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to
// a child component which has buttons to perform the increment and decrement actions.
// Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // Your code starts here
  const handleIncrement = useCallback(() => {
    setCount1((currentCount) => currentCount + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount2((currentCount) => currentCount - 1);
  }, []);
  // Your code ends here

  return (
    <div>
      <p>Count: {count1}</p>
      <p>Count: {count2}</p>
      <CounterButtons fn={handleIncrement} />
      <br />
      <br />
      <CounterButtons fn={handleDecrement} />
    </div>
  );
}

const CounterButtons = memo(({ fn }) => {
  return (
    <div>
      <button onClick={fn}>change count</button>
    </div>
  );
});
