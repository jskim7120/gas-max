import { useDispatch, useSelector } from "app/store";
import { addRowIndex } from "app/state/tab/tabSlice";

function useRowIndex() {
  const tabState = useSelector((state) => state.tab.tabs);
  const dispatch = useDispatch();

  const getRowIndex = (menuId: string, gridNum: number) => {
    const gridIndexes = tabState.find(
      (item) => item.menuId === menuId
    )?.gridIndexes;
    const rowIndex = gridIndexes?.find((item) => item.grid === gridNum)?.row;
    return rowIndex;
  };

  const setRowIndex = (menuId: string, gridNum: number, rowIndex: number) => {
    dispatch(addRowIndex({ menuId: menuId, grid: gridNum, row: rowIndex }));
  };

  return {
    getRowIndex,
    setRowIndex,
  };
}

export default useRowIndex;
