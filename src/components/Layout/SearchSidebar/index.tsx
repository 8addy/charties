import React from "react";
import { FaSearch } from "react-icons/fa";
import "./styles.scss";
import { searchTerms } from "../../../service/Service";
import List from "./List";
import { formatData } from "../utils/utils";
import { SERIE } from "../../../types/types";
import Input from "../../forms/Input/Input";

type Props = {
  isOpen: boolean;
};

const LIMIT_DATA = 20;

const SearchSidebar = ({ isOpen }: Props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const offset = React.useRef<number>(0);

  const className = `sidebar ${isOpen && "sidebar-opened"}`;

  const handleSearch = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const inputVal = (event.target as HTMLTextAreaElement).value;
      setSearchValue(inputVal);
      setData([]);
      offset.current = 0;
      if (inputVal.trim().length > 0) {
        loadData(inputVal);
      }
    }
  };

  const loadData = async (value?: string) => {
    setIsLoading(true);
    const query = value ?? searchValue;
    const result = await searchTerms(query, offset.current, LIMIT_DATA);
    if (result) {
      setData((prev: SERIE[]) => [
        ...(prev || []),
        ...formatData(result.seriess),
      ]);
      offset.current = offset.current + LIMIT_DATA;
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setSearchValue("");
    offset.current = 0;
    setData(null);
  };

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <div className="search-wrapper">
        <Input
          value={searchValue}
          onChange={(value: string) => setSearchValue(value)}
          disabled={isLoading}
          placeholder="Search Term..."
          onKeyDown={handleSearch}
        />
        {searchValue.trim().length ? (
          <span className="search-icon cancel" onClick={handleClear}>
            X
          </span>
        ) : (
          <FaSearch className="search-icon" />
        )}
      </div>
      <List data={data} isLoading={isLoading} loadMore={loadData} />
    </div>
  );
};

export default SearchSidebar;
