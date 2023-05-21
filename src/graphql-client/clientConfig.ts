import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import { setContext } from '@apollo/client/link/context';
import { store } from '../redux/Store';
import { updateToken } from "../redux/AuthSlice"

// https://hoang-blog-server.onrender.com/graphql

const getNewToken = async (userId: string) => {
    try {
        const res = await axios.post(`https://hoang-blog-server.onrender.com/graphql`, {
            query: `
                mutation Mutation($userId: ID) {
                    updateAccessToken(userId: $userId)
                }
            `,
            variables: { userId },
        })
        const newToken = res.data.data.updateAccessToken
        return newToken
    } catch (error) {
        console.log(error)
    }
}

const httpLink = createHttpLink({
    uri: 'https://hoang-blog-server.onrender.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    // Do không thể dùng được useSelector hoặc useDispatch vì nó chỉ được dùng trong
    // function component nên sài trực tiếp từ thằng store
    const selector = store.getState()
    const user = selector.authState.currentUser
    // kiểm tra xem token hiện tại còn hợp lệ hay không
    const token = headers?.token.split(' ')[1]
    if (!token) {
        return {
            headers: {
                ...headers,
            },
        }
    } else {
        const date = new Date
        const { exp }: { exp: number } = jwtDecode(token);
        if (exp < date.getTime() / 1000) {
            // gọi lên server để nhận một token mới
            const newToken = await getNewToken(user!.userId)
            // lưu token mới vào lại store
            store.dispatch(updateToken(newToken))
            // trả về headers mới với token mới
            return {
                headers: {
                    ...headers,
                    token: `Bearer ${newToken}`,
                },
            };
        } else {
            // nếu token hiện tại vẫn còn hợp lệ, trả về headers cũ
            return {
                headers: {
                    ...headers,
                },
            };
        }
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true
})

export default client
