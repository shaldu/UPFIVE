import { StyleSheet, Text, View } from 'react-native'
import { useQuery, gql } from '@apollo/client';
import React from 'react'

const GET_EMAILS = gql`
    query Query {
        users {
            email
            id
        }
    }
`;


export default function Test() {
    const { loading, error, data } = useQuery(GET_EMAILS);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Something went wrong, please try again later!</Text>;
    }
    return (

        <View>
            <Text>E-Mails:</Text>
            {data.users.map((user) => (
                <Text key={user.id}>{user.email}</Text>
            ))}
        </View>
    )
}