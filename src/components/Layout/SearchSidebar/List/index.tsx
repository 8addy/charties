import React, { useContext } from "react";
import "./styles.scss";
import { SERIE } from "../../../../types/types";
import Skeleton from "react-loading-skeleton";
import Item from "./Item";
import { context } from "../../../../context/AppContext";

type Props = {
  data: SERIE[];
  isLoading: boolean;
  loadMore: () => void;
};

const List = ({ isLoading, data, loadMore }: Props) => {
  const { setSelectedSerie, setIsSBOpen, selectedSerie } = useContext(context);

  if (isLoading && (!data || data?.length === 0)) {
    const array = new Array(20).fill(null);
    return (
      <div className="data-list">
        {array.map((_, index: number) => (
          <div key={index} className="item-wrapper">
            <div className="item">
              <div className="left">
                <Skeleton width={300} height={24} style={{ marginBottom: 5 }} />
                <div className="item-details">
                  <Skeleton width={200} />
                </div>
              </div>
              <div className="right">
                <Skeleton width={120} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data === null) return null;

  if (data?.length === 0) {
    return (
      <div className="no-data list">
        <p>No data available</p>
      </div>
    );
  }

  const handleClick = (item: SERIE) => {
    if (item.id === selectedSerie?.id) {
      return setIsSBOpen(false);
    }
    setIsSBOpen(false);
    setSelectedSerie(item);
  };

  return (
    <div className="data-list">
      {data.map((item: SERIE) => (
        <Item
          key={item.id}
          item={item}
          handleClick={handleClick}
          isSelected={!!(selectedSerie?.id === item.id)}
        />
      ))}
      {data?.length > 0 && (
        <div className="load-more">
          <button
            className={`load-more-btn ${isLoading && "btn-disabled"}`}
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading.." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
