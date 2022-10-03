import React, { Suspense } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "app/store";
import { openModal, closeModal } from "features/modal/modalSlice";

const PopupArea = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  border: 1px solid red;
`;

const PopupBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.4;
`;

const PopupContiner = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const CustomerSearch = styled.div`
  width: 916px;
  height: 534px;
  border: 1px solid #1707f9;

  background: #fff;
  .header {
    width: 100%;
    height: 75px;
    background: #eeeaea;
    border-bottom: #707070;
  }
`;

function Popup() {
  const dispatch = useDispatch();
  const { modalIsOpen, type } = useSelector((state) => state.modal);

  if (modalIsOpen)
    return (
      <PopupArea>
        <PopupBack onClick={() => dispatch(closeModal())} />
        <PopupContiner>
          <Suspense fallback={<div>Spinner</div>}>
            {type === "customerSearch" && (
              <CustomerSearch style={{ background: "#fff" }}>
                <div className="header">
                  <label></label>
                </div>
              </CustomerSearch>
            )}
          </Suspense>
        </PopupContiner>
      </PopupArea>
    );
  else return <></>;
}

export default Popup;
