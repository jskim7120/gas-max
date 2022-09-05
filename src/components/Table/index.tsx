import React from "react";
import AppTable from "./style";
interface ITable {
  onClick: () => void;
}

function Table({ onClick }: ITable) {
  return (
    <AppTable>
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>00</td>
          <td onClick={onClick}>01</td>
          <td>csd</td>
          <td>vdfvfd</td>
          <td>vdf</td>
        </tr>
        <tr>
          <td>00</td>
          <td onClick={onClick}>01</td>
          <td>csd</td>
          <td>vdfvfd</td>
          <td>vdf</td>
        </tr>
        <tr>
          <td>00</td>
          <td onClick={onClick}>01</td>
          <td>csd</td>
          <td>vdfvfd</td>
          <td>vdf</td>
        </tr>
        <tr>
          <td>00</td>
          <td onClick={onClick}>01</td>
          <td>csd</td>
          <td>vdfvfd</td>
          <td>vdf</td>
        </tr>
        <tr>
          <td>00</td>
          <td onClick={onClick}>01</td>
          <td>csd</td>
          <td>vdfvfd</td>
          <td>vdf</td>
        </tr>
      </tbody>
    </AppTable>
  );
}

export default Table;
