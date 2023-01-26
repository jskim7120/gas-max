import { useState, useEffect, useRef } from "react";
import { Editable } from "./style";
import { DownArrow } from "components/allSvgIcon";

function EditableSelect({
  list = [],
  register,
  textAlign,
}: {
  list: Array<any>;
  register: any;
  textAlign?: any;
}) {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState<Array<any>>([]);
  const [cursor, setCursor] = useState<number>(-1);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (!divRef.current?.contains(e.target)) {
      setSuggestion([]);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      if (cursor < suggestion.length - 1) {
        setCursor(cursor + 1);
      } else {
        setCursor(suggestion.length - 1);
      }
    }

    if (e.key === "ArrowUp") {
      if (cursor <= 0) {
        setCursor(0);
      } else {
        setCursor(cursor - 1);
      }
    }

    if (e.key === "Enter") {
      setText(suggestion[cursor].codeName);
    }

    if (e.key === "Escape") {
      setSuggestion([]);
    }
  };

  const onChangeHandler = (text: string) => {
    let matches: any = [];
    if (text?.length > 0) {
      setCursor(-1);
      matches = list?.filter((item) => {
        const regex = new RegExp(`${text}`, "gi");
        return item.codeName.match(regex);
      });
    }

    setText(text);
    setSuggestion(matches);
  };

  const onSuggestHandler = (text: string) => {
    setText(text);
    setSuggestion([]);
  };

  const onClickHandler = () => {
    setSuggestion(list);
  };

  return (
    <Editable ref={divRef} textAlign={textAlign && textAlign}>
      <input
        autoComplete="off"
        {...register}
        value={text}
        onChange={(e) => onChangeHandler(e.target.value)}
        onClick={onClickHandler}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <span onClick={onClickHandler}>
        <DownArrow width="15px" height="15px" />
      </span>

      {suggestion && suggestion?.length > 0 && (
        <ul>
          {suggestion.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onSuggestHandler(item.codeName)}
              className={cursor === idx ? `active` : undefined}
            >
              {item.codeName}
            </li>
          ))}
        </ul>
      )}
    </Editable>
  );
}

export default EditableSelect;
