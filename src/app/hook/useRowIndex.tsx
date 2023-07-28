import { useSelector } from "app/store";

function useRowIndex(menuId: string, gridNum: number) {
  const tabState = useSelector((state) => state.tab.tabs);

  const gridIndexes = tabState.find(
    (item) => item.menuId === menuId
  )?.gridIndexes;
  const rowIndex = gridIndexes?.find((item) => item.grid === gridNum)?.row;

  return {
    rowIndex,
    gridIndexes,
  };
}

export default useRowIndex;
