import SignIn from "@src/components/SignIn"
import SignUp from "@src/components/SignUp"
import { Button, Container } from "native-base"
import React from "react";

const AccountPage = ({ navigation }: any) => {

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