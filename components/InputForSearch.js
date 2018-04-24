import React from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  Slider,
  AsyncStorage
} from 'react-native';

export default class InputForSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      columns: 1
    };

    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  componentDidMount() { 
    AsyncStorage.getItem('searchTerm').then(value => { 
      this.setState({ 'searchTerm': value })
    });
  }

  setSearchTerm(value) {
    AsyncStorage.setItem('searchTerm', value);
    this.setState({ 'searchTerm': value });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>  
          <Text>Search Term:</Text>
          <TextInput
            style={{width: 100, marginHorizontal: 10, borderBottomWidth: 1}}
            onChangeText={this.setSearchTerm}
            value={this.state.searchTerm}
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>  
          <Text>Columns:</Text>
          <Slider 
            style={{width: 100, marginHorizontal: 10}}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={value => this.setState({columns: value})}
          />
          <Text>{this.state.columns}</Text>
        </View>
        <Button
          title='Search'
          onPress={() => {
            this.props.navigation.navigate('Images', {
              searchTerm: this.state.searchTerm,
              columns: this.state.columns
            });
          }}
        />
      </View>
    );
  }
}
