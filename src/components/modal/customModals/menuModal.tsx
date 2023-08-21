import React from "react";
import { useDispatch } from "app/store";
import styled from "styled-components";
import { User, MenuModalBtn } from "components/allSvgIcon";
import {
  CustomInf,
  VolBook,
  WeightBook,
  BillIcon,
  ItemStock,
  InsHistory,
  CidHistory,
  RemoteMeter,
  WeightSales,
  VolSupply,
  EqpSales,
  CntEntryExit,
  AsIcon,
  SafCheck,
  VolReading,
  CollRegistr,
} from "components/allSvgIcon-backup";

const ModalWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 301px;
  background: #323232;
  display: flex;
  flex-direction: column;
  padding: 6px;
  gap: 4px;

  .closeBtn {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f80d0d;
    top: 5.5px;
    right: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }
  .section {
    position: relative;
    border-radius: 10px 0 0 10px;
    background: #00b5ad;
    padding: 3px 7px;
    width: 39px;
    height: 178px;

    p {
      writing-mode: vertical-lr;
      text-orientation: mixed;
      color: #fff;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      line-height: 25px;
      margin: auto 0;
      height: 100%;
    }

    span {
      color: #000;
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 44px;
      height: 100%;
      border-radius: 0 10px 10px 0;
      border: 1px solid #707070;
      padding: 10px 5px;
      width: 245px;

      .section_cnt {
        display: flex;
        justify-content: space-between;
        .item_cnt {
          display: flex;
          gap: 9px;
        }
      }
    }
  }
  .section_2 {
    background: #21ba45;
    span {
      padding: 10px 16px;
      .section_cnt {
        margin-top: 8px;
      }
    }
  }
  .section_3 {
    background: #f2711c;
    span {
      padding: 10px 16px;
      .section_cnt {
        margin-top: 8px;
      }
    }
  }
  .h48 {
    height: 48px;
    span {
      padding-left: 16px;
    }
  }
`;

function MenuModal() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper>
      <div className="section h48">
        <p>정보</p>
        <span>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <CustomInf />
              </div>
              <div>거래처정보</div>
            </div>
          </div>
        </span>
      </div>
      <div className="section section_2">
        <p>거래이력</p>
        <span>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <VolBook />
              </div>
              <div>체적장부</div>
            </div>
            <div className="item_cnt">
              <div>
                <WeightBook />
              </div>
              <div>중량장부</div>
            </div>
          </div>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <BillIcon />
              </div>
              <div>계산서</div>
            </div>
            <div className="item_cnt">
              <div>
                <ItemStock />
              </div>
              <div>품목재고</div>
            </div>
          </div>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <InsHistory />
              </div>
              <div>점검이력</div>
            </div>
            <div className="item_cnt">
              <div>
                <CidHistory />
              </div>
              <div>CID 이력</div>
            </div>
          </div>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <RemoteMeter />
              </div>
              <div>원격검침</div>
            </div>
          </div>
        </span>
      </div>
      <div className="section section_3">
        <p>매출</p>
        <span>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <WeightSales />
              </div>
              <div>중량판매</div>
            </div>
            <div className="item_cnt">
              <div>
                <VolSupply />
              </div>
              <div>체적공급</div>
            </div>
          </div>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <EqpSales />
              </div>
              <div>기구판매</div>
            </div>
            <div className="item_cnt">
              <div>
                <CntEntryExit />
              </div>
              <div>용기입출</div>
            </div>
          </div>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <AsIcon />
              </div>
              <div>A/S</div>
            </div>
            <div className="item_cnt">
              <div>
                <SafCheck />
              </div>
              <div>안전점검</div>
            </div>
          </div>
          <div className="section_cnt">
            <div className="item_cnt">
              <div>
                <VolReading />
              </div>
              <div>체적검침</div>
            </div>
            <div className="item_cnt">
              <div>
                <CollRegistr />
              </div>
              <div>수금등록</div>
            </div>
          </div>
        </span>
      </div>
    </ModalWrapper>
  );
}

export default MenuModal;
