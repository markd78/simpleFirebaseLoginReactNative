'use strict';
import {
  AppRegistry,
  ActivityIndicator,
  AsyncStorage,
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import React, {Component} from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation' 
import { Header,Container,Title, Content, Icon,  Card, CardItem , Fab,Footer } from 'native-base';
import { Button as NBButton } from 'native-base';
//Pages and styles
import Login from './Login';
import ListItem from '../components/ListItem.js';
import styles from '../styles/mainstyle.js';

//Component
export default class Account extends Component {

  constructor(props) {
    super(props);
    this.tasksRef = this.props.screenProps.firebaseApp.database().ref();
    this.state = {
      user:null,
      loading: true,
      newTask: ""
    }
  }

  componentDidMount(){
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  componentWillMount() {
    // get the current user from firebase
    // const userData = this.props.firebaseApp.auth().currentUser;
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
        user: userData,
        loading: false,
        active:'true',
        tasks:[]
      });
    });

  }

  //listener to get data from firebase and update listview accordingly
  listenForTasks(tasksRef) {
  tasksRef.on('value', (dataSnapshot) => {
    var tasks = [];
    dataSnapshot.forEach((child) => {
      tasks.push({
        name: child.val().name,
        _key: child.key
      });
    });

    this.setState({
      tasks:tasks
    });
  });
  }

  render() {
    // console.log("tasks value",this.state.tasks);
    // If we are loading then we display the indicator, if the account is null and we are not loading
    // Then we display nothing. If the account is not null then we display the account info.
    const content = this.state.loading ?
    <ActivityIndicator size="large"/> :
       this.state.user &&
                 <Content>
                  <Card dataArray={this.state.tasks}
                    renderRow={(task) => this._renderItem(task)} >
                  </Card>
                </Content>
      ;
      // console.log("loading user",this.state.user,this.state.loading);
    return (
        <Container>
        <Header>
            <NBButton transparent>
                        <Icon name='ios-menu' />
            </NBButton>
            <Title>To Do</Title>
            <Button title='Add' onPress={() => this._addTask()}/>

        </Header>
        {content}
        <Footer style={styles.footer}>
          <TextInput
            value={this.state.newTask}
            style={styles.textEdit}
            onChangeText={(text) => this.setState({newTask: text})}
            placeholder="New Task"
          />

        </Footer>

      </Container>
    );
  }

  //render ListItems as per our needs
  _renderItem(task) {
    // console.log("task",task._key);
    const onTaskCompletion= () => {
      // console.log("clickrecived",this.tasksRef.child(task._key).remove());
      this.tasksRef.child(task._key).remove().then(
        function() {
          // fulfillment
          alert("The task "+task.name+" has been completed successfully");
      },
      function() {
        // fulfillment
        alert("The task "+task.name+" has not been removed successfully");
    });
    }
  return (
    <ListItem task={task} onTaskCompletion={onTaskCompletion} />
  );
  }

  //add a new task to firebase app
  _addTask() {
    // console.log("task value",this.state.newTask);
   if (this.state.newTask === "") {
     return;
   }
   this.tasksRef.push({ name: this.state.newTask});
   this.setState({newTask: ""});
   alert("Task added successfully");
  }
  logout() {
    // logout, once that is complete, return the user to the login screen.
    AsyncStorage.removeItem('userData').then(() => {
      this.props.screenProps.firebaseApp.auth().signOut().then(() => {
        this.props.navigation.dispatch(
              NavigationActions.back()
            );
      });
    });

  }
}

AppRegistry.registerComponent('Account', () => Account);