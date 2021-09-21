import React, { useContext, useState } from "react";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";
import { SearchContainer } from "../screens/restaurant.screen.styles";

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
