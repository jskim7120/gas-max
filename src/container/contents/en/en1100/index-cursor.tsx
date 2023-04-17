import React, { useRef, useEffect } from "react";

function Form({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const inputRefs = useRef([]) as React.MutableRefObject<any[]>;

  useEffect(() => {
    // Focus on the first input field on mount
    inputRefs.current[0]?.focus();
  }, []);

  function handleKeyDown(event: any, index: number) {
    if (event.key === "Enter") {
      event.preventDefault();

      // If the current input is not the last one, move to the next input field
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  function registerInputRef(ref: any, index: number) {
    inputRefs.current[index] = ref;
  }

  return (
    <form>
      <label>
        Field 1:
        <input
          type="text"
          onKeyDown={(event) => handleKeyDown(event, 0)}
          ref={(ref) => {
            console.log("ref0:::", ref);
            registerInputRef(ref, 0);
          }}
        />
      </label>
      <label>
        Field 2:
        <input
          type="text"
          onKeyDown={(event) => handleKeyDown(event, 1)}
          ref={(ref) => {
            console.log("ref1:::", ref);
            registerInputRef(ref, 1);
          }}
        />
      </label>
      <label>
        Field 3:
        <input
          type="text"
          onKeyDown={(event) => handleKeyDown(event, 2)}
          ref={(ref) => {
            console.log("ref2:::", ref);
            registerInputRef(ref, 2);
          }}
        />
      </label>
    </form>
  );
}

export default Form;
