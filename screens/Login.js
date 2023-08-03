import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/backImage.jpg");
const logo = require("../assets/logo.png");

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  
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
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'white',  fontSize: 14}}>New here? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{color: '#f64079', fontWeight: 'bold', fontSize: 14}}>Register</Text>
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
    paddingTop: 80
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginTop: 10,    
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
