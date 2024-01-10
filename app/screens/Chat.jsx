import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect, useCallback } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getUserId } from "../services/authService";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  //cargar mensajes
  useEffect(() => {
    const getMessages = async () => {
      const chatRef = collection(FIREBASE_DB, "chats");
      const userId = getUserId(FIREBASE_AUTH.currentUser.id);
      const q = query(
        chatRef,
        where("usuarioCliente.id", "==", userId),
        orderBy("createdAt", "desc")
      );

      const dataMessages = await getDocs(q);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("Snapshot");

        setMessages(querySnapshot.docs.map((doc) => {}));
      });

      /* setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]); */
    };
    getMessages();
  }, []);

  /* const renderMessages = (msgs) => {
    const messages = [];
    msgs.forEach((doc) => {
      messages.push({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: {
          _id: doc.data().user._id,
          name: doc.data().user.name,
          avatar: doc.data().user.avatar,
        },
      });
    });
    return messages;
  } */

  const renderMessages = useCallback((msgs) => {
    //structure for chat library:
    // msg = {
    //   _id: '',
    //   user: {
    //     avatar:'',
    //     name: '',
    //     _id: ''
    //   }
    // }

    return msgs
      ? msgs.reverse().map((msg, index) => ({
          ...msg,
          _id: index,
          user: {
            _id: FIREBASE_AUTH.currentUser.email,
            avatar: "",
            name: FIREBASE_AUTH.currentUser.email,
          },
        }))
      : [];
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, text, createdAt, user } = messages[0];
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: FIREBASE_AUTH.currentUser.email,
      }}
    />
  );
};

export default Chat;
