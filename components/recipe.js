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

export class Recipe extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <View>
        <Image
          style={styles.welcomeImage}
          source={this.props.content.img}
        />
        <Text>
          {this.props.content.title}
        </Text>
        <Text>
          {this.props.content.description}
        </Text>
       {/* <View>
          {this.props.content.ingredients.map(text => <Text>* {text}</Text>)}
        </View>
         <View>
          {this.props.content.directions.map(text => <Text>* {text}</Text>)}
        </View>*/}
      </View>
    );
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
