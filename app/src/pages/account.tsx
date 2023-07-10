import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import SignIn from "@src/components/SignIn"
import SignUp from "@src/components/SignUp"
import { Button, Container } from "native-base"
import React from "react";

export type PageProps<T extends string, P extends ParamListBase = ParamListBase> = {route: RouteProp<P, T>, navigation: NavigationProp<P, T>};

const AccountPage = ({ navigation }: PageProps<"Account">) => {

    const [signUpView, setSignUpView] = React.useState(false);

    const toggleView = () => {
        setSignUpView(!signUpView);
    }

    return (
        <Container>
            {signUpView ? <SignUp toggleView={toggleView} /> : <SignIn toggleView={toggleView} />}
            <Button onPress={() =>
                navigation.navigate('Home')
            }>
                Home
            </Button>
        </Container>
    )
}

export default AccountPage