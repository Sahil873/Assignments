/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useReducer, useRef } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  const [, forceRender] = useState(0);
  const numOfRenders = useRef(0); // reference remains the same across renders but value can be changed
  numOfRenders.current = numOfRenders.current + 1;

  const handleReRender = () => {
    // Update state to force re-render
    forceRender(Math.random());
  };

  return (
    <div>
      <p>This component has rendered {numOfRenders.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
