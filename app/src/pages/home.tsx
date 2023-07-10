import { Button, Container, Text } from "native-base";

const HomePage = ({navigation}: any) => {
    return (
        <Container>
            <Text>Home Page</Text>
            <Button onPress={() =>
                navigation.navigate('Account')
            }>
                Account
            </Button>
        </Container>
    );
}

export default HomePage;