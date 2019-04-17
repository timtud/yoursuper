import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {Recipe} from '../components/recipe';
import {  Divider } from 'react-native-elements';

import Colors from '../constants/Colors';

const categoryList = ["Drinks", "Breakfast" , "Lunch"]

export class RecipeList extends React.Component {
  constructor(props){
    super(props);

  }


  createLists = () => {
    let lists = []

    categoryList.map(cat => {
      const filteredRobots = this.props.content.filter(recipe => (cat.toLowerCase() === recipe.category.toLowerCase()));
      return(
          <FlatList
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          initialNumToRender={3}
          data={filteredRobots}
          renderItem={
            ({item}) => <Recipe content={item}/>
          }
           keyExtractor={(item) => item.title}
          />
        )
      })




  }
  render() {
    if (this.props.content.length !== 0)
      return (

      <ScrollView>
      <Divider style={{ backgroundColor: '#82b845', height: 2 }} />

      {categoryList.map(cat => {
      const filteredRobots = this.props.content.filter(recipe => (cat.toLowerCase() === recipe.category.toLowerCase()));
      if (filteredRobots.length !== 0) return(
        <View>
          <Text>{cat}</Text>
          <Divider style={{ backgroundColor: '#82b845', height: 2, marginVertical: 5 }} />

          <FlatList
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          initialNumToRender={3}
          data={filteredRobots}
          renderItem={
            ({item}) => <Recipe navigation={this.props.nav} content={item}/>
          }
           keyExtractor={(item) => item.title}
          />
        </View>
        )
      })}
      </ScrollView>
      );
    else
      return(
        <Text style={styles.empty}>Sorry no recipes found</Text>
        )
  }
}

const styles = StyleSheet.create({
   welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  empty: {
    marginTop: 20,
    alignSelf: 'center',
    color: "#82b845",
    fontSize: 15,
    fontWeight: 'bold',
  }
});
