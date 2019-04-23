import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  AsyncStorage,
} from 'react-native';
import Layout from '../constants/Layout';
import { Divider } from 'react-native-elements';
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
const w = Layout.window.width;
const h = Layout.window.height;

export default class RecipeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
    }
  }
  static navigationOptions = {

  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
    this.getList()
    });
  }

    componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  addShop = (ing) => {
    this.setList(ing)

  }

  getList = () => {
    AsyncStorage.getItem('ShoppingList')
      .then(req => JSON.parse(req))
      .then(json => this.setState({
        list: json
      }))
      .catch(error => console.log('no list!'));
  }

  setList = (ing) => {
    let uplist = this.state.list
    uplist.push({title: ing, checked: false})
    this.setState({list: uplist})
    AsyncStorage.setItem("ShoppingList", JSON.stringify(this.state.list))
    .catch(error => console.log(error))
  }

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
            {content.directions.map((dir, i)  => {
              return (
                <View key={i}>
                <Text>{dir}</Text>
                <Divider style={{ backgroundColor: '#82b845', height: 2, marginVertical: 5 }} />
                </View>
                )
            })}
          </View>
          <View tabLabel='Ingredients'>

            {content.ingredients.map((ing, i) => {
              return (
                <View key={i}>
                <Button
                title= {"add"}
                onPress={() => this.addShop(ing)}
                />
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
