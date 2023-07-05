import * as React from "react";
import { useQuery, gql, useLazyQuery, useMutation, MutationFunctionOptions } from '@apollo/client';
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, HStack, Alert, Text, ScrollView, Stack, Divider } from "native-base";

const INSERT_SIGNUP = gql`
        mutation Mutation($input: UserInput!) {
            createUser(input: $input) {
                email
                username
                message
            }
        }
    `;

export default () => {
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [createUser, { loading, error, data }] = useMutation(INSERT_SIGNUP);

    const userInput = {
        email: email ?? 'x',
        username: username ?? 'x',
        password: password ?? 'x',
        // Add other input values as needed
    };

    const trySignUp = () => {
        createUser({
            variables: {
                input: userInput,
            },
        });
    }

    console.log(error);
    
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8" style={{opacity: loading ? 0.7 : 1}}>
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
                                        {data.createUser.message}
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
