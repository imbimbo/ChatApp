import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Home from './screens/Home';

// Create a stack navigator for managing screens in the app
const Stack = createStackNavigator();

// Create a context to hold authenticated user information
const AuthenticatedUserContext = createContext({});

// Create a component to provide the authenticated user context to its children
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

// Function to define the stack of screens for Chat related pages
function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Group Chat' component={Chat} />
    </Stack.Navigator>
  );
}

// Function to define the stack of screens for Authentication related pages
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

// Main navigation component that renders different stacks based on the user's authentication status
function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber function for Firebase authentication
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        // If the user is authenticated, set the user data in the context, otherwise, set it to null
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // Unsubscribe auth listener on unmount to prevent memory leaks
    return unsubscribeAuth;
  }, [user]);
  // Show a loading indicator while the authentication status is being checked
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  // If authentication check is complete, render the appropriate stack based on the user's authentication status
  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// Main App component wrapped with the AuthenticatedUserProvider to manage the authenticated user context
const App = () => {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};

export default App;