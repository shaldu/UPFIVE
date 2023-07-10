import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { Button, Container, Text } from "native-base";
export type PageProps<T extends string, P extends ParamListBase = ParamListBase> = {route: RouteProp<P, T>, navigation: NavigationProp<P, T>};

const HomePage = ({navigation}: PageProps<"Home">) => {
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