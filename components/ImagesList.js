import React from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  ScrollView, 
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

const cheerio = require('react-native-cheerio')

const screenWidth = Dimensions.get('window').width;

export default class ImagesList extends React.Component {
  constructor() {
    super();

    this.state = {
      imagesUrl: [],
      photosAreLoaded: false
    };

    this.renderImages = this.renderImages.bind(this);
  }

  componentDidMount() {
    return fetch(`https://www.bing.com/images/search?q=${this.props.navigation.state.params.searchTerm}`)
      .then(res => {
        return res.text();
      })
      .then(html => {
        const $ = cheerio.load(`${html}`);
        let arrayOfUrl = [];

        $('img').each((i, element) => {
          const src = $(element).attr("src");
          // define if source of image has real 'http' url
          if (src[0] === 'h') {
            arrayOfUrl.push(src)
          }
        });

        this.setState({imagesUrl: arrayOfUrl, photosAreLoaded: true})
      });
  }

  renderImages(item, idx) {
    const sizeOfImage = screenWidth / this.props.navigation.state.params.columns;

    return <Image key={idx} style={{width: sizeOfImage, height: sizeOfImage}} source={{uri: item}}/>;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.photosAreLoaded ?
          <ScrollView>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {this.state.imagesUrl.map(this.renderImages)}
            </View>
          </ScrollView> :
          <ActivityIndicator size='large' style={{flex: 1}}/>
        }
        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
          <Image style={styles.arrowBack} source={require('./arrowBack.png')}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 50,
    height: 50
  }
});
