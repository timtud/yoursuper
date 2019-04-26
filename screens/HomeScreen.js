import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  NetInfo,
  AsyncStorage,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import {RecipeList} from '../components/recipeList';
import { MonoText } from '../components/StyledText';
import { SearchBar, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import * as firebase from 'firebase';
import Config from '../constants/config';

const powderList = [
  {
    label: 'Super Green',
    value: 'Super Green',
  },
  {
    label: 'Power Matcha',
    value: 'Power Matcha',
  },
  {
    label: 'Forever Beautiful',
    value: 'Forever Beautiful',
  },
];



firebase.initializeApp(Config.config);


NetInfo.getConnectionInfo().then((connectionInfo) => {
  console.log(
    'Initial, type: ' +
      connectionInfo.type +
      ', effectiveType: ' +
      connectionInfo.effectiveType,
  );
});

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      powder: '',
      recipes: [],
    }
  }

  componentWillMount() {

    const rootRef = firebase.database().ref().child('recipes')
    rootRef.on('value', (snap) => {
    this.save(snap.val().reverse())
    });
    AsyncStorage.getItem('RecipeList')
      .then(req => JSON.parse(req))
      .then(json => this.setState({
        recipes: json
      }))
      .catch(error => console.log('error!'));
  }

  save = async (file) => {
    try {
      await AsyncStorage.setItem("RecipeList", JSON.stringify(file))
    } catch (e) {
      console.error(e)
    }
  }

  updateSearch = query => {
       this.setState({
        search: query
    })
  };

  clearSearch = () => {
       this.setState({
        search: "",
        powder: "",
    })
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const { recipes, search, powder} = this.state;
    const filteredRobots = recipes.filter(recipe =>{
      return recipe.title.toLowerCase().includes(search.toLowerCase())
       && (powder.toLowerCase() === recipe.powder.toLowerCase() || powder === "");
    })

    return (
      <View style={styles.container}>
       <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={{
          backgroundColor: "#82b845",
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
        inputContainerStyle={{
          backgroundColor: "#82b845",
        }}
        inputStyle={{
          color: 'white',
        }}
        searchIcon={
            {color:'white'}
          }
        clearIcon={
            {color:'white'}
          }
        placeholderTextColor="#fff"
        onClear={this.clearSearch}
      />
      <View style={styles.pickersLayout}>
        <RNPickerSelect
          placeholder={{
            label: 'Select a powder',
            value: "",

          }}
          items={powderList}
          onValueChange={value => {
            if (value === null)
              value = ""
            this.setState({
              powder: value,
            });
          }}
          style={{
            placeholder: {
              color: "#82b845",
              fontSize: 15,
              fontWeight: 'bold',
            },
             viewContainer:{
              flex: 1,
            },
           inputAndroid: {
              backgroundColor: 'transparent',
              color: "#82b845",
              fontSize: 15,
              fontWeight: 'bold',
            },
            inputIOS: {
              backgroundColor: 'transparent',
              color: "#82b845",
              fontSize: 15,
              fontWeight: 'bold',
            },
            iconContainer: {
              // top: 5,
              right: 5,
            },
          }}
          value={this.state.powder}
          Icon={() => {
            return (
              <View
                style={styles.pickers}
              />
            );
          }}
        />
      </View>
        <RecipeList nav={this.props.navigation} filter={this.state.powder} content = {filteredRobots}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  pickersLayout: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 7,
  },
  pickers:{
    backgroundColor: 'transparent',
    borderTopWidth: 20,
    borderTopColor: "#82b845",
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    marginLeft: 20,
  },
});
