import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";

import { FavouritesContext } from "../../services/favourites/favourites.context";

import { SafeArea } from "../../components/utility/safe-area.component";
import { Spacer } from "../../components/spacer/spacer.component";

import { RestaurantList } from "../restaurants/screens/restaurant.screen.styles";
import { RestaurantInfoCard } from "../restaurants/components/restaurant-info-card.component";

const NoFavouritesArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea isAndroid={false}>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
