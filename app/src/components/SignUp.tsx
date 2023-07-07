import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, HStack, Alert, Text, ScrollView, Stack, Divider } from "native-base";
import API from "@src/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
    let error = false;
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const trySignUp = async () => {
        const requestData = {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        };
        // const response = await API.get('/api/users/a18b6681-72ec-43db-8632-b1f4640192ad');
        const response = await API.post('/api/users', requestData);
        const {status, newUser, sessionId} = response.data;

        if (status === 200) {
            //save session id in local storage
            await AsyncStorage.setItem('sessionId', sessionId);
            await AsyncStorage.setItem('userId', newUser.id);
        }
                
    }

    const testAuth = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const response = await API.get(`/api/users/${userId}`);
        console.log(response.data);
    }
    
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }} fontWeight="semibold">
                    Welcome
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>
                {error &&
                    <Alert w="100%" variant={"outline-light"} colorScheme="danger" status="danger" style={{marginTop: "10px"}}>
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon />
                                    <Text>
                                        Error
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                }
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input value={username} onChangeText={setUsername} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" value={password} onChangeText={setPassword} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input type="password" value={confirmPassword} onChangeText={setConfirmPassword} />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={trySignUp}>
                        Sign up
                    </Button>
                    <Button mt="2" colorScheme="indigo" onPress={testAuth}>
                        Test Authenticated Request
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};
