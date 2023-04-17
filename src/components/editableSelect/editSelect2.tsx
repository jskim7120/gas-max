import { useState, useEffect, useRef } from "react";
import { Editable } from "./style";
import { DownArrow } from "components/allSvgIcon";

function EditableSelect({
  list,
  initialValue,
  setValue,
  textAlign,
  style,
  name,
}: {
  list: Array<any>;
  initialValue: any;
  setValue: Function;
  textAlign?: any;
  style?: any;
  name?: string;
}) {
  const [text, setText] = useState<string>("");
  const [suggestion, setSuggestion] = useState<Array<any>>([]);
  const [cursor, setCursor] = useState<number>(-1);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (initialValue && list) {
      const selected: any = list.find((item) => item.code === initialValue);
      if (selected) {
        setText(selected?.codeName);
      } else {
        setText("");
      }
    } else {
      setText("");
    }
  }, [list, initialValue]);

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

    setCursor(-1);
    matches = list?.filter((item) => {
      const regex = new RegExp(`${text}`, "gi");
      return item.codeName.match(regex);
    });

    setText(text);
    setValue(text);
    setSuggestion(matches);
  };

  const onSuggestHandler = (item: any) => {
    setText(item.codeName);
    setValue(item.code);
    setSuggestion([]);
  };

  const onClickHandler = () => {
    setCursor(-1);
    setSuggestion(list);
  };

  return (
    <Editable ref={divRef} textAlign={textAlign && textAlign} style={style}>
      <input
        autoComplete="off"
        name={name && name}
        value={text}
        onClick={onClickHandler}
        onChange={(e) => onChangeHandler(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <span onClick={onClickHandler}>
        <DownArrow width="15px" height="15px" />
      </span>
      {suggestion && suggestion?.length > 0 && (
        <ul>
          {suggestion
            //.filter((e) => e.code.includes(value))
            .map((item, idx) => (
              <li
                key={idx}
                onClick={() => onSuggestHandler(item)}
                onMouseEnter={() => setCursor(idx)}
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
