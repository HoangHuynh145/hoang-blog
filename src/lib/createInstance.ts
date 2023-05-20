import { ApolloLink } from '@apollo/client';

const setAuthorizationLink = new ApolloLink((operation, forward) => {
    // Called before operation is sent to server
    operation.setContext({ start: new Date() });

    console.log(operation, forward)

    return forward(operation).map((data) => {
        // Called after server responds
        return data;
    });
});

export default setAuthorizationLink
