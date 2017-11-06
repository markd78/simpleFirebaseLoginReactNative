import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Navigator,
  Text,
  View,
  ToolbarAndroid
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation'

//Pages
import Signup from './src/pages/Signup.js';
import Login from './src/pages/Login.js';
import Account from './src/pages/Main.js';
import styles from './src/styles/mainstyle.js'
import * as firebase from 'firebase';  // Initialize Firebase
  var fireBaseconfig = {
    apiKey: "AIzaSyCgKahQag2-sl6UthZJ8sQ3XEtJHCYSK44",
    authDomain: "socialmovie-7f2e7.firebaseapp.com",
    databaseURL: "https://socialmovie-7f2e7.firebaseio.com",
    projectId: "socialmovie-7f2e7",
    storageBucket: "socialmovie-7f2e7.appspot.com",
    messagingSenderId: "632773619663"
  };
  // firebase.initializeApp(fireBaseconfig);
const firebaseApp = firebase.initializeApp(fireBaseconfig);
 
 const Stacks = StackNavigator({
    Login: {
      screen: Login
    },
    Signup:{
      screen: Signup
    },
    Account:{
      screen: Account
    }
});
 
export class SocialVid extends Component {
  constructor(props){
    super(props);
    this.state={
      openingPage: null
    }
  }
  componentWillMount(){
    //Check if userData is stored on device else open Login
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let openingPage = {openingPage: Login};
      if(user_data != null){
        this.setState({openingPage:Account});
      }else{
        this.setState(openingPage);
      }
    });
 
  }
  render() {
  // const { navigate } = this.props.navigation;
 //  if (!this.state.openingPage) {
      return (
      
      <Stacks
  screenProps={{ firebaseApp }}
/>


      
    );
  }
}
 
 
AppRegistry.registerComponent('SocialVid', () => SocialVid);