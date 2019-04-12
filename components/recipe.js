import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Card, Divider } from 'react-native-elements';

const w = Layout.window.width;
const h = Layout.window.height;



export class Recipe extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (

      //<View style={styles.container}>
      <Card
      imageStyle={styles.welcomeImage}
      containerStyle={styles.container}
      imageWrapperStyle={{alignContent: 'center'}}

      image={this.props.content.img}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipe', {con: this.props.content})}>
          <Text numberOfLines={2}>
            {this.props.content.title}
          </Text>
      </TouchableOpacity>
        </Card>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // margin: 10,

    // alignSelf:'center',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
     width: (h*25)/100,
     height: (h*25)/100,
  },
   welcomeImage: {
    maxWidth: (h*25)/100,
    maxHeight: (h*15)/100,



  },
  textContainer: {
    width: (w*45)/100,
    height: (h*20)/100,
  },
});
