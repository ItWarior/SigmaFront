logInPage();

const senFormBtn = document.getElementById('sendFormBtn');
const posts = document.querySelector('.posts');

senFormBtn.onclick = async (ev) => {
    await signInFirstPage(ev);
};
posts.onclick = async (ev) => {
    await signInpostPage(ev);

};

//local Storage
function createSession(AccessToken, RefreshToken) {
    localStorage.clear();
    localStorage.setItem('accessToken', AccessToken);
    localStorage.setItem('refreshToken', RefreshToken);
}

//DOM PAGES
function logInPage() {
    const content = document.getElementById('content');
    const menu = document.getElementById('menu');

    menu.innerHTML = `
    <ul>
        <span class="posts">
            POSTS
        </span>
    </ul>
    <ul>
        <span class="users">
            LOGIN
        </span>
    </ul>`

    content.innerHTML =
        `    <div id="loginPage">
        <form id="loginForm">
            <input type="text" id="emailInput" placeholder="email">
                <input type="text" id="passwordInput" placeholder="password">
        </form>
        <button id="sendFormBtn">login</button>
    </div>`;


}

async function loggedInUser(userName) {
    const content = document.getElementById('content');
    const menu = document.getElementById('menu');

    menu.innerHTML = `
    <div class="userName">${userName}</div>
    <ul>
        <span class="posts">
            POSTS
        </span>
    </ul>
    <ul>
        <span class="users">
            USERS
        </span>
    </ul>
    <ul>
        <span class="logOut">
            LOGOUT
        </span>
    </ul>`

    content.innerHTML = ''

    const postHref = document.querySelector('.posts');
    postHref.onclick = async (ev) => {
        await signInpostPage(ev);
    }
}

function postsPage() {
    const content = document.getElementById('content');
    const menu = document.getElementById('menu');

    menu.innerHTML = `

    <ul>
        <span class="posts">
            POSTS
        </span>
    </ul>
    <ul>
        <span class="login">
            LOGIN
        </span>
    </ul>`

    content.innerHTML = `    
    <div class="post">
        <p class="text"></p>
        <div class="timestamp">
            <span class="createAt"></span>
            <span class="updateAt"></span>
        </div>
    </div>
    `
    const postHref = document.querySelector('.posts');
    postHref.onclick = async (ev) => {
        await signInpostPage(ev);
    }

}

//Error to console
function isError(response) {
    if (response.ok) {
        return false
    }
    console.log('Error')
    console.log(`code: ${response.status}`);
    console.log(`message:  ${response.statusText}`);
    return true
}

//Fetch requests
async function signInFirstPage(ev) {
    const loginInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    if (!loginInput.value || !passwordInput.value) {
        console.log('ree')
        return
    }

    const response = await fetch('http://localhost:3000/auth/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: loginInput.value, password: passwordInput.value})
    })

    if (isError(response)) {
        return
    }

    const user = await response.json();

    createSession(user.accessToken, user.refreshToken);
    loggedInUser(user.name);
}

async function signInpostPage(ev) {
    const response = await fetch('http://localhost:3000/posts/');

    if (isError(response)) {
        return
    }

    const postsObj = await response.json();
    postsPage();
    console.log(postsObj);

}


