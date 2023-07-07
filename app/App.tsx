import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';

import { NativeBaseProvider } from 'native-base';

import SignUp from '@src/components/SignUp';
import SignIn from '@src/components/SignIn';
import UserContext from '@src/userContext';
import { useEffect, useState } from 'react';
import API from "@src/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@src/@types/user';

export default function App() {

  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {

    async function checkAuth() {
      if (user != null) return;

      const userId = await AsyncStorage.getItem('userId');
      const sessionId = await AsyncStorage.getItem('sessionId');
      if (userId == null || sessionId == null || userId == '' || sessionId == '') return;

      const response = await API.get(`/api/users/${userId}`);
      
      setUser(response.data);
    }


    checkAuth();


  }, []);

  return (
    <NativeBaseProvider>
      <UserContext.Provider value={{ user }}>
        <Container>
          <SignUp />
          <SignIn />
        </Container>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
