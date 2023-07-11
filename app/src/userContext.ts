// UserContext.js
import React from 'react';
import { UserProfile } from './@types/user';

const UserContext = React.createContext({
    user: null as null | UserProfile,
});

export default UserContext;