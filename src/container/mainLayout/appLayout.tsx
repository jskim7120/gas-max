import { useSelector, useDispatch } from "app/store";
import { Container, TopSide, TopLeftWrapper, Icons } from "./style";
import { HeaderBtn, Settings, User } from "components/allSvgIcon";
import Navbar from "components/menu/navbar";
import LogoImg from "assets/image/Logo.png";
import { openModal } from "app/state/modal/modalSlice";
import Footer from "../contents/footer";
import { logout } from "app/state/auth/authSlice";

let menuData: Array<any>;

export default function AppLayout({ children }: { children: any }) {
  const dispatch = useDispatch();
  menuData = useSelector((state) => state.menu.menu);
  return (
    <Container>
      <TopSide>
        <TopLeftWrapper>
          <img src={LogoImg} />
          <Navbar data={menuData} />
        </TopLeftWrapper>
        <Icons>
          <span
            onClick={() => {
              dispatch(logout());
              window.location.assign("/relogin");
            }}
          >
            <HeaderBtn />
          </span>
          <span>
            <Settings />
          </span>
          <span onClick={() => dispatch(openModal({ type: "accountModal" }))}>
            <User />
          </span>
        </Icons>
      </TopSide>

      {children}

      <Footer />
    </Container>
  );
}
