import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './graphql';
import Test from './components/Test';
import { Container } from 'native-base';
import SignUp from './components/SignUp';
import { NativeBaseProvider } from 'native-base';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <Container>
          <SignUp />
          <SignIn />
        </Container>
      </NativeBaseProvider>
    </ApolloProvider>
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
