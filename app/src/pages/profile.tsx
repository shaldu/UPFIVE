import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { Button, Container, Text } from "native-base";
import API from "@src/api";
import React, { useEffect } from "react";
import { Profile } from "@src/@types/user";
import ProfileView from "@src/components/ProfileView";

export type PageProps<T extends string, P extends ParamListBase = ParamListBase> = { route: RouteProp<P, T>, navigation: NavigationProp<P, T> };

const ProfilePage = ({ navigation, route }: PageProps<"Profile">) => {
    //@ts-ignore
    const username = route.params?.username ?? '';
    const [profileData, setData] = React.useState<string | Profile>('');

    if (username == '' || username == null) {
        return (
            <Container>
                <Text>404</Text>
            </Container>
        )
    }

    const userData = async () => {
        try {
            const response = await API.get(`/api/profile/${username}`);
            const data = response.data;

            if (response.status === 200) {
                setData(data);                
            } else {
                setData('User not found');
            }
        } catch (error) {
            setData('User not found');
        }
    }

    useEffect(() => {
        setData('');
        userData();
    }, [username]);

    if (profileData === '') {
        return (
            <Container>
                <Text>Loading...</Text>
            </Container>
        )
    } else if (typeof profileData === 'string') {
        return (
            <Container>
                <Text>{profileData}</Text>
            </Container>
        )
    }

    return (
        <ProfileView profileData={profileData} />
    );
}

export default ProfilePage;