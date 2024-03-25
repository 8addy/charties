import { FaSearch } from "react-icons/fa";
import "./styles.scss";

type Props = {
  handleSideBar: () => void;
};

const Header = ({ handleSideBar }: Props) => {
  return (
    <div className="header">
      <h3 className="logo">Charties</h3>
      <div className="search-icon-wrapper">
        <FaSearch className="search-icon" onClick={handleSideBar} />
      </div>
    </div>
  );
};

export default Header;
