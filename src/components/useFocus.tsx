import { useState, useEffect, useRef } from "react";

export default function useFocus(
  ref: React.MutableRefObject<HTMLInputElement>,
  defaultState = false
) {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const onFocus = () => setState(true);
    const onBlur = () => setState(false);
    ref.current.addEventListener("focus", onFocus);
    ref.current.addEventListener("blur", onBlur);

    return () => {
      ref.current.removeEventListener("focus", onFocus);
      ref.current.removeEventListener("blur", onBlur);
    };
  }, []);

  return state;
}
