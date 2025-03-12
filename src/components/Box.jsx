import React, { useEffect, useState } from "react";

const Box = ({ background }) => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    console.log('🚀"useEffect"---->', "useEffect");
  }, [count]);

  useEffect(() => {
    window.addEventListener("scroll", () => {});
  }, [background]);

  return (
    <div style={{ height: 10000 }}>
      <div
        style={{
          background: background,
          fontSize: 16,
          width: 600,
          height: 600,
        }}
      >
        <button onClick={handleIncrease}>+</button>
        <p>{count}</p>
        <button onClick={handleDecrease}>-</button>
      </div>
    </div>
  );
};

export default Box;
