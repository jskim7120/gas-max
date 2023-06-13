import { useSelector } from "app/store";
import { Main, Sidebar, UnOrderedList } from "./style";
import Tab from "components/tab";

import { ShortcutIcon } from "components/allSvgIcon";
import {
  Sidebar1,
  Sidebar2,
  Sidebar3,
  Sidebar4,
  Sidebar5,
  Sidebar6,
  Sidebar7,
  Sidebar8,
  Sidebar9,
  Sidebar10,
  Sidebar11,
} from "components/allSvgIcon-sidebar";

function MainContainer() {
  const { isOpen } = useSelector((state) => state.sidebar);

  return (
    <Main>
      <Sidebar isOpen={isOpen}>
        <div className="header_cnt">
          <div className="header">
            <span>
              <ShortcutIcon />
            </span>
            <span>바로가기</span>
          </div>
        </div>
        <nav>
          <UnOrderedList>
            <li>
              <a>
                <Sidebar1 />
                <p>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar2 />
                <p>체적공급</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar3 />
                <p>체적검침</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar4 />
                <p>거래처</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar5 />
                <p>가스매입</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar6 />
                <p>재고관리</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar7 />
                <p>A/S관리</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar8 />
                <p>현금출납</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar9 />
                <p>중량수급</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar10 />
                <p>체적수급</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar11 />
                <p>세금계산서</p>
              </a>
            </li>
          </UnOrderedList>
        </nav>
      </Sidebar>

      <Tab />
    </Main>
  );
}

export default MainContainer;
