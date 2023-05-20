import { gql } from "@apollo/client"

const getUsers = gql`
    query getUsersQuery {
        users {
            userId
            username
            email
        }
    }
`

const findUserByEmail = gql`
    query Query($email: String) {
        findUserByEmail(email: $email)
    }
`

const findUserByName = gql`
    query Query($username: String) {
        findUserByName(username: $username)
    }
`

const getUserProfile = gql`
    query Profile($userHashtag: String) {
        profile(userHashtag: $userHashtag) {
            ownPosts {
                postId
                title
                thumbnail
                introContent
                slug
            }
            username
            avatar
            isAdmin
        }
    }
`

const getTotalInfo = gql`
    query Query {
        getTotalInfo {
            TotalArticles
            TotalWorkplaces
            TotalProjects
        }
    }
`

const getAllPosts = gql`
    query Posts {
        posts {
            postId
            introContent
            createdAt
            slug
            title
        }
    }
`

const getPostByType = gql`
    query PostsByType($type: String) {
        postsByType(type: $type) {
            postId
            title
            introContent
            createdAt
            slug
        }
    }
`

const getPostById = gql`
    query Post($postId: ID!) {
        post(postId: $postId) {
            postId
            title
            types
            contents
            introContent
        }
    }
`

const getPostDetail = gql`
    query Post($postId: ID!) {
        post(postId: $postId) {
            postId
            thumbnail
            title
            types
            contents
            introContent
            contact {
                likes
                comments
            }
            slug
            author {
                userHashtag
                avatar
                username
            }
            createdAt
        }
    }
`

const getOwnPost = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            ownPosts {
                postId
                thumbnail
                title
                introContent
            }
        }
    }
`

const getProjects = gql`
    query Projects {
        projects {
            projectId
            name
            desc
            technologies
            link
            dateDeploy
        }
    }
`

const getProjectById = gql`
    query Project($projectId: String) {
        project(projectId: $projectId) {
            projectId
            name
            desc
            technologies
            link
            dateDeploy
        }
    }
`

const getWorkplaces = gql`
    query Workplaces {
        workplaces {
            workplaceId
            name
            descWork
            dateStart
            dateEnd
        }
    }
`

const getWorkplaceById = gql`
    query Workplace($workplaceId: String) {
        workplace(workplaceId: $workplaceId) {
            workplaceId
            name
            descWork
            dateStart
            dateEnd
        }
    }
`

export {
    getUsers,
    findUserByEmail,
    getUserProfile,
    getTotalInfo,
    getAllPosts,
    getPostByType,
    getPostById,
    getOwnPost,
    getPostDetail,
    getProjects,
    getProjectById,
    getWorkplaces,
    getWorkplaceById,
    findUserByName
}
