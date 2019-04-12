import React from 'react';
import { ScrollView, StyleSheet, Button, Text } from 'react-native';
import { Facebook } from 'expo';
import * as firebase from 'firebase';

const userCurrent = '';
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    const userCurrent = user
    console.log("We are authenticated now!");
  }
// Do other things
});


export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  async logIn() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync('398288334055875', {
      permissions: ['public_profile', "email"],
    });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
      });
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=email,name&access_token=${token}`);
      alert(`Hi ${(await response.json()).email}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}



  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          onPress={this.logIn}
          title="Log in"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
