import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

AppRegistry.registerComponent('ImagesSearch', () => App);
// there is a bug with last version react-navigation
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);