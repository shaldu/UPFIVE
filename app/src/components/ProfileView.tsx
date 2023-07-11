import { Profile, UserProfile } from "@src/@types/user";
import API from "@src/api";
import UserContext from "@src/userContext";
import { Text } from "native-base";
import { useContext, useEffect } from "react";

type Props = {
  profileData: Profile;
};
export default ({ profileData }: Props) => {

  const { user } = useContext(UserContext);
  if (user == null) return null;

  const sendFriendRequest = async () => {
    const data = {
      sentProfileId: user.profile.id,
      receiveProfileId: profileData.profile.id,
    };
    const respone = await API.post(`/api/friends/request/`, data);
  }

  

  return (
    <>
      <Text>{profileData.profile.displayname}</Text>
    </>
  )
}