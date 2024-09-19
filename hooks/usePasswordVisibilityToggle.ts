import { useState } from "react";
interface VisibilityProps {
  defaultVisiblityState?: boolean;
}

const useVisibility = (props: VisibilityProps = {}) => {
  const [hide, setHide] = useState(props.defaultVisiblityState ?? true);

  const toggle = () => {
    setHide((prevState) => !prevState);
  };

  const setVisibility = (open: boolean) => {
    setHide(open);
  };

  return {
    state: hide,
    toggle: toggle,
    setVisibility,
  };
};

export default useVisibility;
