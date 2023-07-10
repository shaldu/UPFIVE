import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Container, Stack } from 'native-base';
import { Link, NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';

import UserContext from '@src/userContext';
import { useEffect, useState } from 'react';
import API from "@src/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@src/@types/user';
import HomePage from '@src/pages/home';
import AccountPage from '@src/pages/account';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator(
    
  );
  const [user, setUser] = useState<null | User>(null);

  const config = {
    screens: {
      Home: 'home',
      Account: 'account',
    },
  };

  const linking = {
    prefixes: ['http://localhost:19006/'],
    config,
  };

  const state = {
    routes: [
      { name: 'Home', params: { screen: 'Home' } },
      { name: 'Account', params: { screen: 'Account' } },
    ],
  }


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
      <NavigationContainer linking={linking} >
        <UserContext.Provider value={{ user }}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={AccountPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
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
