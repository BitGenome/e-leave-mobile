import { useState } from "react";

export const useLeaveBalance = ({ initialValue = 0 } = {}) => {
  const [balance, setBalance] = useState(initialValue);

  const increment = () => {
    setBalance((prevBalance) => prevBalance + 1);
  };

  const decrement = () => {
    setBalance((prevBalance) => (prevBalance > 0 ? prevBalance - 1 : 0)); // Prevent negative values
  };

  return {
    balance,
    increment,
    decrement,
  };
};
