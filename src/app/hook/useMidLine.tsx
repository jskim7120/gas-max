import { useState } from "react";
import Draggable from "react-draggable";
import { useSelector } from "app/store";

function useMidLine(leftSideWidth: number) {
  const isOpen = useSelector((state) => state.sidebar);
  const [linePos, setLinePos] = useState<number>(leftSideWidth);

  const handleDrag = (event: any, ui: any) => {
    setLinePos(ui.x);
  };

  const showDraggableLine = () => {
    return (
      <Draggable
        axis="x"
        bounds={{
          left: 0,
          right: window.innerWidth,
        }}
        position={{ x: linePos, y: 0 }}
        onDrag={handleDrag}
      >
        <div
          style={{
            position: "absolute",
            top: "117px",
            left: `${isOpen} ? 87px : 5px`,
            width: "4px",
            height: "calc(100% - 197px)",
            backgroundColor: "#707070",
            cursor: "col-resize",
          }}
        ></div>
      </Draggable>
    );
  };

  return {
    showDraggableLine,
    linePos,
  };
}

export default useMidLine;
