import React, { useState, useRef, useEffect } from "react";
import { DownArrow } from "components/allSvgIcon";

const EditableSelect3 = ({ list }: { list: any }) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isEditing, setIsEditing] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isEditing === false) {
      inputRef?.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "130px" }}
          onKeyDown={() => setIsEditing(false)}
        >
          {list?.map((item: any, idx: number) => (
            <option key={idx} value={item.code}>
              {item.codeName}
            </option>
          ))}
        </select>
      ) : (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "130px" }}
            ref={inputRef}
          />
          <span
            onClick={() => setIsEditing(true)}
            style={{
              position: "absolute",
              right: "5px",
              border: "1px solid red",
              width: "25px",
              height: "25px",
            }}
          >
            <DownArrow width="15px" height="15px" />
          </span>
        </div>
      )}
    </>
  );
};

export default EditableSelect3;
