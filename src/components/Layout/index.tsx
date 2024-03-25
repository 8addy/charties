import React, { useContext } from "react";
import Header from "./Header";
import SearchSidebar from "./SearchSidebar";
import "./styles.scss";
import { context } from "../../context/AppContext";

type Props = {
  children: JSX.Element;
};

const Layout = (props: Props) => {
  const { isSBOpen, setIsSBOpen } = useContext(context);

  const handleSideBar = () => {
    setIsSBOpen(!isSBOpen);
  };

  return (
    <div
      className={`app-layout ${isSBOpen && "overlay"}`}
      onClick={() => isSBOpen && handleSideBar()}
    >
      <div className="header-wrapper">
        <Header handleSideBar={handleSideBar} />
      </div>
      <div className="main-wrapper">{props.children}</div>
      <SearchSidebar isOpen={isSBOpen} />
    </div>
  );
};

export default Layout;
