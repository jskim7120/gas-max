import { useEffect, useState } from "react";
import { useSelector } from "app/store";
import { useAreaNameMutation } from "app/api/auth";
import { HeaderBtn, Settings, User } from "components/allSvgIcon";
import Navbar from "components/menu/navbar";
import Modal from "components/modal/modal";
import LogoImg from "assets/image/Logo.png";
import Footer from "../contents/footer";
import { Container, TopSide, TopLeftWrapper, Icons } from "./style";

let menuData: Array<any>;

export default function AppLayout({ children }: { children: any }) {
  menuData = useSelector((state) => state.menu.menu);
  const auth = useSelector((state) => state.auth);

  const [areaName, { data }] = useAreaNameMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    if (auth?.areaCode) {
      areaName({ areaCode: auth.areaCode });
    }
  }, [auth?.areaCode]);

  return (
    <>
      <Modal
        type="reLoginModal"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <Modal
        type="accountModal"
        isOpen={isModalOpen2}
        setIsOpen={setIsModalOpen2}
      />
      <Container>
        <TopSide>
          <TopLeftWrapper>
            <img src={LogoImg} />
            <Navbar data={menuData} />
          </TopLeftWrapper>

          <Icons>
            <div className="areaName">
              {auth?.areaCode && auth.areaCode}:{data && data[0]?.areaName} (
              {auth?.loginCo && auth?.loginCo})
            </div>
            <span
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <HeaderBtn />
            </span>
            <span>
              <Settings />
            </span>
            <span onClick={() => setIsModalOpen2(true)}>
              <User />
            </span>
          </Icons>
        </TopSide>

        {children}

        <Footer />
      </Container>
    </>
  );
}
