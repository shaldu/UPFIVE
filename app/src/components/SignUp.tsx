import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, HStack, Alert, Text, ScrollView, Stack, Divider } from "native-base";
import API from "@src/api";


export default () => {
    let error = false;
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const trySignUp = async () => {
        const response = await API.get("/api");
        
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
                </VStack>
            </Box>
        </Center>
    );
};