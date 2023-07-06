import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';

import { NativeBaseProvider } from 'native-base';

import SignUp from '@src/components/SignUp';
import SignIn from '@src/components/SignIn';

export default function App() {
  return (
      <NativeBaseProvider>
        <Container>
          <SignUp />
          <SignIn />
        </Container>
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
