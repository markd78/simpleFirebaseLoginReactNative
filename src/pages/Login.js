'use strict';
import {
  AppRegistry,
  AsyncStorage,
  View,
  ToolbarAndroid,
  ActivityIndicator,
  Button
} from 'react-native';
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker } from 'native-base';
import React, {Component} from 'react';
 import Signup from './Signup';
import Account from './Main'
import styles from '../styles/mainstyle.js';
 
export default class Login extends Component {
 
  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }
 
  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    // const content = this.state.loading ?
    // <View style={styles.body}>
    // <ActivityIndicator size="large"/>
   //  </View> :
  const {navigate} = this.props.navigation;
   const content = <Content>
                   <List>
                     <ListItem>
                         <InputGroup>
                         <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                         <Input
                          onChangeText={(text) => this.setState({email: text})}
                          value={this.state.email}
                          placeholder={"Email Address"} />
                          </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                          <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                        <Input
                          onChangeText={(text) => this.setState({password: text})}
                          value={this.state.password}
                          secureTextEntry={true}
                          placeholder={"Password"} />
                        </InputGroup>
                   </ListItem>
                  </List>
                  <Button  onPress={this.login.bind(this)} title="Login" width='150'  height= '60'/>
                 
                  <Button onPress={this.goToSignup.bind(this)} style={styles.primaryButton} title="New Here?"/>
                    
 
          </Content>
        ;
 
    // A simple UI with a toolbar, and content below it.
        return (
                  <Container>
                            <Header>
                              <Title>Login</Title>
                           </Header>
 
                  {content}
                </Container>
                );
  }
 
  login(){
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    this.props.screenProps.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
        this.setState({
                loading: false
              });
              AsyncStorage.setItem('userData', JSON.stringify(userData));
              this.props.navigation.navigate('Account');
      }
    ).catch((error) =>
        {
              this.setState({
                loading: false
              });
        alert('Login Failed. Please try again'+error);
    });
  }
 
  // Go to the signup page
  goToSignup(){
    this.props.navigation.navigate('Signup');
  }
}
 
AppRegistry.registerComponent('Login', () => Login);