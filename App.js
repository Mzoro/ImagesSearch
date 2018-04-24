import React from 'react';
import { StackNavigator } from 'react-navigation';
import InputForSearch from './components/InputForSearch';
import ImagesList from './components/ImagesList';

const RootStack = StackNavigator(
  {
    Search: {
      screen: InputForSearch
    },
    Images: {
      screen: ImagesList
    }
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}