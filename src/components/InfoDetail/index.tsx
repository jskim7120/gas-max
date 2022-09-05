import React from "react";
import { Wrapper } from "./style";

function InfoDetail({ data }: { data: any }) {
  console.log("datafdvdffdvfd:", data);
  return (
    <Wrapper>
      <form>
        <div className="form-group">
          <label>
            영업소코드:
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={data.areaCode}
            />
          </label>
          <label>
            Age:{" "}
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={data.swCode}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Color:
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={data.color}
            />
          </label>
          <label>
            Job:
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={data.job}
            />
          </label>
        </div>
        <div></div>
      </form>
    </Wrapper>
  );
}

export default InfoDetail;
