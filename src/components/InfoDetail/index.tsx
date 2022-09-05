import React from "react";
import { Wrapper } from "./style";

function InfoDetail({ data }: { data: any }) {
  console.log("datafdvdffdvfd:", data.areaCode);
  return (
    <Wrapper>
      <form>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={data.name}
            />
          </label>
          <label>
            Age:{" "}
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={data.areaCode}
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
