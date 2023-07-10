import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { Button, Container, Text } from "native-base";

export type PageProps<T extends string, P extends ParamListBase = ParamListBase> = {route: RouteProp<P, T>, navigation: NavigationProp<P, T>};

const ProfilePage = ({navigation, route }: PageProps<"Profile">) => {
    //@ts-ignore
    const username = route.params?.username ?? '';
    
    if (username == '' || username == null) {
        return (
            <Container>
                <Text>404</Text>
            </Container>
        )
    }

    
    return (
        <Container>
            <Text>Home Page !</Text>

        </Container>
    );
}

export default ProfilePage;