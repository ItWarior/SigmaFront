//Fetch requests
//AUTH ROUT
async function logIn() {
    const loginInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    if (!loginInput.value || !passwordInput.value) {
        console.log('Password or email are empty')
        return
    }

    const response = await fetch(`${connectionString}auth/log-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: loginInput.value, password: passwordInput.value})
    })
    const {status} = await isError(response);
    if (status) {
        return
    }

    const user = await response.json();
    CURRENT_USER = user;
    createSessionOrOverwrite(user.accessToken, user.refreshToken);
    mainPage(user.name);
}

async function refreshTokens() {
    const response = await fetch(`${connectionString}auth/refresh`, {
        method: 'POST',
        headers:{
            authorization: getAccessToken(),
            refreshToken: getRefreshToken()
        }
    })

    const {status, message} = await isError(response);

    if (status){
        if (message !== 'jwt expired') {
            logInPage()
            return
        }
    }

    const {accessToken, refreshToken} = await response.json();
    createSessionOrOverwrite(accessToken, refreshToken);
    return getAccessToken();
}

async function logOut(accessToken) {
    const response = await fetch(`${connectionString}auth/log-out`, {
        method: 'POST',
        headers: {
            authorization: accessToken
        }
    })

    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await logOut(accessToken);
        }
        return
    }

    deleteSession();
    logInPage();

}

//POSTS ROUT
async function signInPostPage() {
    const response = await fetch(`${connectionString}posts/`);
    const {status} = await isError(response);
    if (status) {
        return
    }

    const posts = await response.json();

    postsPageAtBegin(posts);
}

async function signInPostPageFromMain() {
    const response = await fetch(`${connectionString}posts/`);
    const {status} = await isError(response);
    if (status) {
        return
    }

    POSTS = await response.json();

    postsPageFromMain(POSTS);
}
async function createPost(accessToken, post) {
    const response = await fetch(`${connectionString}posts/`, {
        method: 'POST',
        headers: {
            authorization: accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)

    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await updateCurrentUser(accessToken);
        }
        return
    }
    await signInPostPageFromMain();
}
async function findPostByUserId(accessToken, userId) {
    const response = await fetch(`${connectionString}posts/${userId}`, {
        method: 'GET',
        headers: {
            authorization: accessToken,
        }
    })

    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await updateCurrentUser(accessToken);
        }
        return
    }

    POSTS = await response.json();

    postsPageFromMain(POSTS);
}
async function deletePost(accessToken, postId) {
    const response = await fetch(`${connectionString}posts/${postId}`, {
        method: 'DELETE',
        headers: {
            authorization: accessToken,
        }

    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await deleteCurrentUser(accessToken);
        }
        return
    }
    await signInPostPageFromMain();
}
async function updatePost(accessToken, newPost, postId) {
    const response = await fetch(`${connectionString}posts/${postId}`, {
        method: 'PUT',
        headers: {
            authorization: accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: newPost})

    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await updateCurrentUser(accessToken);
        }
        return
    }
    await signInPostPageFromMain();
}
//USERS ROUT
async function signInUserPageFromMain(accessToken) {
    const response = await fetch(`${connectionString}users/`, {
        method: 'GET',
        headers: {
            authorization: accessToken,
        }
    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await signInUserPageFromMain(accessToken);
        }
        return
    }
    USERS = await response.json();
    usersPage(USERS);
}
async function deleteCurrentUser(accessToken) {
    const response = await fetch(`${connectionString}users/${CURRENT_USER._id}`, {
        method: 'DELETE',
        headers: {
            authorization: accessToken,
        }

    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await deleteCurrentUser(accessToken);
        }
        return
    }
    logInPage();
}
async function updateCurrentUser(accessToken, user) {
    const changedUser= {...CURRENT_USER, ...user};
    const response = await fetch(`${connectionString}users/${CURRENT_USER._id}`, {
        method: 'PUT',
        headers: {
            authorization: accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await updateCurrentUser(accessToken);
        }
        return
    }
    CURRENT_USER = changedUser
    mainPage(CURRENT_USER.name);
}
async function createUser(accessToken, user) {
    const response = await fetch(`${connectionString}users/`, {
        method: 'POST',
        headers: {
            authorization: accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await updateCurrentUser(accessToken);
        }
        return
    }
    await signInUserPageFromMain(accessToken);

}
async function findUserById(accessToken, userId) {
    const response = await fetch(`${connectionString}users/${userId}`, {
        method: 'GET',
        headers: {
            authorization: accessToken,
        }
    })

    const {status, message} = await isError(response);
    if (status) {
        if (message === 'jwt expired') {
            const accessToken = await refreshTokens();
            await updateCurrentUser(accessToken);
        }
        return
    }
    USERS = [];
    USERS[0] = await response.json();
    usersPage(USERS);
}

