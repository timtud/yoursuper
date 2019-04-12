import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Layout from '../constants/Layout';
import { Divider } from 'react-native-elements';
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
const w = Layout.window.width;
const h = Layout.window.height;

export default class RecipeScreen extends React.Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {

  };

  render() {
    let content = this.props.navigation.getParam('con');
    console.log(content)

    return (
      <ScrollView>
        <Image
          source={content.img}
          style={styles.welcomeImage}
        />
        <ScrollableTabView
          style={{marginTop: 20, }}
          initialPage={1}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel='Directions'>
            {content.directions.map(dir => {
              return (
                <View>
                <Text>{dir}</Text>
                <Divider style={{ backgroundColor: '#82b845', height: 2, marginVertical: 5 }} />
                </View>
                )
            })}
          </View>
          <View tabLabel='Ingredients'>
            {content.ingredients.map(ing => {
              return (
                <View>
                <Text>{ing}</Text>
                <Divider style={{ backgroundColor: '#82b845', height: 2, marginVertical: 5 }} />
                </View>
                )
            })}
          </View>
          <Text tabLabel='Tips'>project</Text>
        </ScrollableTabView>

      </ScrollView>
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
    width: w,
    height: w,



  },
  textContainer: {
    width: (w*45)/100,
    height: (h*20)/100,
  },
});
