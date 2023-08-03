import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { Image } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Bubble } from 'react-native-gifted-chat'
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';


export default function Chat() {

  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();


  const renderBubble =  (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary
          }
        }}
      />
    )
  };

  // Function to render the avatar for each message
  const renderAvatar = (props) => {
    const { currentMessage } = props;
    return (
      <Image
        source={{ uri: currentMessage.user.avatar }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    );
  };


  // Load chat messages from Firebase Firestore
  useLayoutEffect(() => {

    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    // Subscribe to real-time updates of the chat messages
    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
    return unsubscribe; // Unsubscribe from real-time updates when the component unmounts
  }, []);

  // Function to handle sending a new message
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );

    // Save the new message to Firebase Firestore
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <FontAwesome name="search" size={24} color={colors.darkGrey} style={{marginRight: 20}}/>
        )
    });
}, [navigation]);



  return (
 
    <GiftedChat
      renderBubble={renderBubble}
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={true}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email, // Set the current user's ID as the email
        avatar: 'https://i.pravatar.cc/300' // Default avatar image for the user
      }}
    />
  );
}

