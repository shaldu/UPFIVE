import { Profile, UserProfile } from "@src/@types/user";
import API from "@src/api";
import UserContext from "@src/userContext";
import { Button, Text } from "native-base";
import { useContext, useEffect } from "react";
import Friendlist from "./Friendlist";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type Props = {
  profileData: Profile;
};
export default ({ profileData }: Props) => {
  const { user } = useContext(UserContext);
  let ownProfile = false;

  if (user == null) return null;

  //if user.profile and profile are the same show user profile
  if (user.profile.id == profileData.profile.id) {
    ownProfile = true;
  }


  const sendFriendRequest = async () => {
    const data = {
      sentProfileId: user.profile.id,
      receiveProfileId: profileData.profile.id,
    };
    const respone = await API.post(`/api/friends/request/`, data);
  }

  const getFriends = async () => {
    const response = await API.get(`/api/friends/${user.profile.id}`);
    console.log(response.data);
  }

  getFriends();
  if (ownProfile) {
    return (
        <>
          <Text>{profileData.profile.displayname}</Text>
          <Button onPress={() => { }}>Edit Profile</Button>
          {/* <Friendlist></Friendlist> */}
        </>
    )
  }

  return (
    <>
      <Text>{profileData.profile.displayname}</Text>
      <Button onPress={sendFriendRequest}>Add Friend</Button>
    </>
  )
}