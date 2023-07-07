// UserContext.js
import React from 'react';
import { User } from './@types/user';

const UserContext = React.createContext({
    user: null as null | User,
});

export default UserContext;