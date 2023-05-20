import { gql } from "@apollo/client"

const userLogin = gql`
    mutation UserLogin($email: String, $password: String) {
        userLogin(email: $email, password: $password) {
            userId
            email
            username
            avatar
            userHashtag
            isAdmin
            accessToken
        }
    }
`
const userRegister = gql`
    mutation CreateUser($newUser: createUserInput!) {
        createUser(newUser: $newUser) {
        email
        }
    }
`;


const createPost = gql`
    mutation Mutation($userId: String, $postInfo: createPostInput) {
        createPost(userId: $userId, postInfo: $postInfo) {
            postId  
        }
    }
`

const updatePost = gql`
    mutation UpdatePost($postId: ID, $userId: ID, $postInfo: updatedPostInfo) {
        updatePost(postId: $postId, userId: $userId, postInfo: $postInfo) {
            message
            updatedPost {
                postId
                introContent
                createdAt
                slug
                title
            }
        }
    }
`

const createProject = gql`
    mutation Mutation($projectInf: createProject) {
        createProject(projectInf: $projectInf) {
            projectId
        }
    }
`

const updateProject = gql`
    mutation Mutation($projectInf: updateProject) {
        updateProject(projectInf: $projectInf) {
            message
            updatedProject {
                projectId
                name
                desc
                dateDeploy
                link
                technologies
            }
        }
    }
`

const createWorkPlace = gql`
    mutation Mutation($workplaceInf: createWorkplace) {
        createWorkplace(workplaceInf: $workplaceInf) {
            workplaceId
        }
    }
`

const updateWorkplace = gql`
    mutation Mutation($workplaceInf: updateWorkplace) {
        updateWorkplace(workplaceInf: $workplaceInf) {
            message
            updatedWorkplace {
                dateDeploy
                link
                technologies
                desc
                name
                projectId
            }
        }
    }
`

const updateUser = gql`
    mutation Mutation($updatedInfo: createUserInput, $userId: String, $currentPassword: String) {
        updateUser(updatedInfo: $updatedInfo, userId: $userId, currentPassword: $currentPassword) {
            state
            field
            message
        }
    }
`

const deleteArticle = gql`
    mutation Mutation($postId: String) {
        deletePost(postId: $postId)
    }
`

const deleteProject = gql`
    mutation DeleteProject($projectId: String) {
        deleteProject(projectId: $projectId)
    }
`

const deleteWorkplace = gql`
    mutation Mutation($workplaceId: String) {
        deleteWorkplace(workplaceId: $workplaceId)
    }
`

const refreshToken = gql`
    mutation Mutation($userId: ID) {
        updateAccessToken(userId: $userId)
    }
`

const logout = gql`
    mutation Mutation {
        userLogout
    }
`

export {
    userLogin,
    userRegister,
    createPost,
    updatePost,
    createProject,
    updateProject,
    createWorkPlace,
    updateWorkplace,
    updateUser,
    deleteArticle,
    deleteProject,
    deleteWorkplace,
    refreshToken,
    logout
}
