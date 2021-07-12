import { StatusBar } from 'expo-status-bar';
import { render } from 'react-dom';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  getWord = (text) => {
   var text=text.toLowerCase()
   try{
     var word = dictionary[text]["word"]
     var lexicalCategory = dictionary[text][lexicalCategory]
     var definition = dictionary[text]["definition"]
     this.setState({
       word:word,
       lexicalCategory:lexicalCategory,
       definition:definition
     })
   }
   catch(err){
     alert("Sorry This word is not available for now")
     this.setState({
       'text':'',
       isSearchPressed:false
     })
   }
  }

  render() {
    return (
      <View style={styles.container}>
       <Header
          backgroundColor={'blue'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#fff', fontSize: 20, fontFamily:'sans-serif'},
          }}
        />
        <TextInput
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
          style={styles.inputBox}
        />

        <TouchableOpacity
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}
          style={styles.searchButton}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.detailsText}>Word: {this.state.text}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.detailsText}>Type: {this.state.lexicalCategory}</Text>
        </View>
        <View style={styles.container}>
        <Text style={styles.detailsText}>Definition: {this.state.definition}</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop:200,
    width: '100%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '100%',
    height: 10,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    marginBottom: 50,
    
  },
  searchText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily:'monospace'
  },

  detailsText:{
    marginTop:20,
    textAlign:'center',
    width:200,
    padding:10,
    fontFamily:'sans-serif'
  },
  container:{
    flex:1,
    backgroundColor:'lightblue',
    width:'100%',
  }
});
