import React from 'react';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { Icon } from "react-native-elements";

import SearchPage from "./Components/SearchPage.js";
import RocketView from "./Components/RocketView.js";
import FavoritesView from "./Components/FavoritesView.js";


import { Provider } from 'react-redux';

import store from './store.js';


import { TabNavigator } from 'react-navigation';


const App = () => {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  )
}


const Tabs = TabNavigator({
  Search: {
    screen: SearchPage,
    navigationOptions:  {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Icon name="add" color={tintColor} />
    },
  },
  Search2: {
    screen: FavoritesView,
    navigationOptions:  {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => <Icon name="favorite" color={tintColor} />
    },
  },
});

export default App
