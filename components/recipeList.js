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
import {Recipe} from '../components/recipe';

import Colors from '../constants/Colors';

export class RecipeList extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    if (Array.isArray(this.props.content))
      return (
        <ScrollView>
        {
          this.props.content.map(text => {
            if (this.props.filter === text.powder || this.props.filter === "")
           return <Recipe content={text} key = {text.title} />
          })
        }
        </ScrollView>
      );
    // else if (this.props.content)
    //   return (
    //     <ScrollView>
    //     {
    //       Object.values(this.props.content).map(text => {
    //         if (this.props.filter === text.powder || this.props.filter === "")
    //         return <Recipe content={text} key = {text.title} />
    //       })
    //     }
    //     </ScrollView>
    //   );
    else
      return(
        <Text>Sorry no recipes found</Text>
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
  }
});
