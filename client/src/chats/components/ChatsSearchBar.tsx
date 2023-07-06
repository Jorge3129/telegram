import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface IChatSearchBar {
  searchItem: string;
  setSearchItem: Dispatch<SetStateAction<string>>;
}

const ChatsSearchBar: FC<IChatSearchBar> = ({ searchItem, setSearchItem }) => {
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="chat_search_bar top_bar">
      <input
        className="chat_search_input"
        type="search"
        placeholder="Search"
        value={searchItem}
        onChange={changeSearch}
      />
    </div>
  );
};

export default ChatsSearchBar;
