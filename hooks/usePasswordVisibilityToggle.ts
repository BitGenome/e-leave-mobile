import { useState } from "react";
interface VisibilityProps {
  defaultVisiblityState?: boolean;
}

const useVisibility = (props: VisibilityProps = {}) => {
  const [hide, setHide] = useState(props.defaultVisiblityState ?? true);

  const toggle = () => {
    setHide((prevState) => !prevState);
  };

  return {
    state: hide,
    toggle: toggle,
  };
};

export default useVisibility;
