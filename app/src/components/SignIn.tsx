import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, HStack, Alert, Text, ScrollView, Stack, Divider, Link } from "native-base";
import API from "@src/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  toggleView: () => void
};
export default ({ toggleView }: Props) => {

  let error = false;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const trySignIn = async () => {
    const requestData = {
      email,
      password
    };

    const response = await API.post('/api/users/login', requestData);
    const { status, user, sessionId } = response.data;

    if (status === 200) {
      //save session id in local storage
      await AsyncStorage.setItem('sessionId', sessionId);
      await AsyncStorage.setItem('userId', user.id);
    }

  }

  return (

    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input value={password} onChangeText={setPassword} />
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={trySignIn}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text>
              I'm a new user.{" "}
            </Text>
            <Button onPress={toggleView} variant="unstyled" style={{ padding: 0, }}>
              Sign up
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>

  );

}