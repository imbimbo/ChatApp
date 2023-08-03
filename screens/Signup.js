import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const backImage = require("../assets/backImage.jpg");
const logo = require("../assets/logo.png");

export default function Signup({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState("");

const onHandleSignup = () => {
    if (email !== '' && password !== '') {
  createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  function confirmPasswordsMatch(props) {
    //check password against the confirmationPassword
    const {
      nativeEvent: { text },
    } = props;

    if(text !== password) {
      alert('Passwords do not match, please try again.')
    }
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground source={backImage} resizeMode='stretch' style={styles.backImage}>
      <Image source={logo} style={styles.logo}/>
      <SafeAreaView style={styles.form}>
         <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={confirmationPassword}
        onChangeText={setConfirmationPassword}
        onSubmitEditing={confirmPasswordsMatch}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Register</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'white', fontSize: 14}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color: '#f64079', fontWeight: 'bold', fontSize: 14}}> Log In</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    justifyContent: 'center',
    marginHorizontal: 50,
    marginTop: 70
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginTop: 40,    
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 48,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 0,
    padding: 12,
  },
  button: {
    backgroundColor: '#00c6bb',
    height: 48,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});