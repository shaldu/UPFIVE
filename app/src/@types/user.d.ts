export type User = {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
}

export type UserProfile = {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    profileId: string;
    profile: {
        id: string;
        displayname: string;
        bio: string;
        updatedAt: Date;
        privacy: Privacy;
    }
}

export type Profile = {
    username: string;
    profile: {
        id: string;
        displayname: string;
        bio: string;
        privacy: Privacy;
    }
}
