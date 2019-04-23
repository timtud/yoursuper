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
  FlatList,
  Button,
} from 'react-native';
import { CheckBox} from 'react-native-elements';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Shopping list',
  };
   constructor(props){
    super(props);
    this.state = {
      list: [],
    }
  }
//{id: 0, title: "almond milk", checked: true},{id: 1, title: "almond milk", checked: true},{id: 2, title: "almond milk", checked: false}
  componentWillMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getList()
    });
    //this.setList();

  }

   componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  getList = () => {
    AsyncStorage.getItem('ShoppingList')
      .then(req => JSON.parse(req))
      .then(json => this.setState({
        list: json
      }))
      .catch(error => console.log('no list!'));
  }

  setList = () => {
    AsyncStorage.setItem("ShoppingList", JSON.stringify(this.state.list))
    .catch(error => console.log(error))

  }

  deleteItemById = id => {
  const filteredData = this.state.list.splice(id , 1);
  this.setState({ list: filteredData });
  this.setList();
  this.getList();
}

  CheckItemById = id => {
  const filteredData = this.state.list
  filteredData[id] = {title: filteredData[id].title ,checked: !filteredData[id].checked}
  this.setState({ list: filteredData });
  this.setList();
  this.getList();
}

putText = (item) => {
  if (item.checked){
    return { textDecorationLine: 'line-through' }
  } else {
    return {}
  }
}



  render() {
    const list = this.state.list
    return(

       <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={({item, index}) =>
          <View>
            <TouchableOpacity onPress={ () => this.CheckItemById(index)}>
              <View>
              <Text style={this.putText(item)}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <Button title={"delete"}
              onPress={ () => this.deleteItemById(index)}
            />
          </View>
        }
        keyExtractor={(item) => item.title}
        />
      </View>


      ) ;
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
