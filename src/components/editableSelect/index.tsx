import { useState, useEffect, useRef } from "react";
import { Editable } from "./style";
import { DownArrow } from "components/allSvgIcon";

function EditableSelect({
  list = [],
  reset,
  register,
  watch,
  textAlign,
  style,
}: {
  list: Array<any>;
  reset: Function;
  register: any;
  watch: any;
  textAlign?: any;
  style?: any;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  const [suggestion, setSuggestion] = useState<Array<any>>([]);
  const [cursor, setCursor] = useState<number>(-1);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //useEffect(() => {
  //if (watch !== undefined) {
  // onChangeHandler(watch);
  //}
  //}, [watch]);

  const resetField = (text: string) => {
    reset((formValues: any) => ({
      ...formValues,
      [register.name]: text,
    }));
  };

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
    //huuchin iim baiv
    // if (e.key === "Enter") {
    //   suggestion[cursor]?.codeName && resetField(suggestion[cursor]?.codeName);
    //   setSuggestion([]);
    // }

    if (e.key === "Enter") {
      e.preventDefault();
      suggestion[cursor]?.codeName && resetField(suggestion[cursor]?.codeName);
      setSuggestion([]);

      const element = e.target;
      const form = element.form;

      if (form) {
        const index = Array.prototype.indexOf.call(form, element);

        let cursor = 1;

        while (form.elements[index + cursor] !== undefined) {
          console.log(form.elements[index + cursor]);
          if (
            form.elements[index + cursor].readOnly ||
            form.elements[index + cursor].disabled
          ) {
            cursor += 1;
          } else {
            form.elements[index + cursor].focus();
            break;
          }
        }
      }
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

    resetField(text);
    setSuggestion(matches);
  };

  const onSuggestHandler = (text: string) => {
    resetField(text);
    setSuggestion([]);
  };

  const onClickHandler = () => {
    setSuggestion(list);
  };

  return (
    <Editable ref={divRef} textAlign={textAlign && textAlign} style={style}>
      <input
        autoComplete="off"
        {...register}
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
