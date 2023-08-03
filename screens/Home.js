import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
import { signOut } from 'firebase/auth';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import { Ionicons  } from '@expo/vector-icons';


  // Function to handle signing out the user
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };


const Home = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.darkGrey} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <TouchableOpacity
                  style={{
                    marginRight: 10
                  }}
                  onPress={onSignOut}
                >
                  <Ionicons name="exit-outline" size={30} color={colors.darkGrey} style={{ marginRight: 10 }} />
                </TouchableOpacity>
              )
        });
    }, [navigation]);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Group Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });