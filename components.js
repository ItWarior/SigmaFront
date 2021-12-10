//components
function startMenuComponent() {
    return `
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
}

function startBodyComponent() {
    return `    <div id="loginPage">
        <form id="loginForm">
            <input type="text" id="emailInput" placeholder="email">
                <input type="text" id="passwordInput" placeholder="password">
        </form>
        <button id="sendFormBtn">login</button>
    </div>`;
}

function startBodyPostsComponent(posts) {
    let innerHTML = '';

    for (const post of posts) {
        innerHTML += `
        <div class="post">
           
            <p class="text">${post.text}</p>
        </div>`
    }
    return `<div class="posts">${innerHTML}</div>`;
}

function mainMenuComponent(userName) {
    return `
    <div class="userName">${userName}</div>
    <ul>
        <span class="main">
            MAIN
        </span>
    </ul>
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
}

function mainBodyComponent(userName) {
    return `
    <h1 class="mainTitle">
        welcome ${userName}  in our site
    </h1>
    <div class="userBlock">
        <div class="logicBlock">
            <div class="avatar">
                <img src="http://img2.reactor.cc/pics/post/%D0%BB%D0%B8%D1%81%D1%8B-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%9C%D0%B5%D0%BC%D1%8B-3584669.png" alt="avatar">
            </div>
            <button class="delete">delete</button>
            <button class="update">update</button>
        </div>
        <div class="userData">
            <span class="name">Name: ${CURRENT_USER.name}</span>
            <span class="email">Email: ${CURRENT_USER.email}</span>
            <span class="age">Age: ${CURRENT_USER.age}</span>
            <span class="role">Role: ${CURRENT_USER.roles}</span>
            <span class="id">Id: ${CURRENT_USER._id}</span>
        </div>
    </div>
`
}

function mainBodyUsersComponent(users) {
    let innerHTML = `
        <div class="usersLogBlock">
            <bottom class="createUserPage">
                Create NEW USER
            </bottom>
            <div class="findInputUser">
                <input placeholder="User Id" type="text" class="findUserInput">
                <button class="findUserBtn">Find by ID</button>
            </div>
        </div>`;


    for (const user of users) {
        innerHTML += `
        <div class="user">
            <span class="name">name: ${user.name}</span>
            <span class="email">email: ${user.email}</span>
            <span class="age">age: ${user.age}</span>
            <span class="role">role: ${user.roles}</span>
            <span class="id">id: ${user._id}</span>
        </div>
        `
    }
    return `<div class="usersInMain">${innerHTML}</div>`;
}

function mainBodyPostsComponent(posts) {
    let userPosts = ``;
    let innerHTML = ``;
    const header =
        `<div class="postLogBlock">
            <bottom class="createPostPage">
                Create NEW POST
            </bottom>
            <div class="findInputPost">
                <input placeholder="Post Id" type="text" class="findPostInput">
                <button class="findPostBtn">Find by USER ID</button>
             </div>
        </div>`;

for (const post of posts) {
        if (post.userId === CURRENT_USER._id) {
            userPosts += `
                <div class="post">
                    <p class="text">${post.text}</p>
                    <div class="timestamp">
                        <span class="createAt">createAt: ${post.createdAt}</span>
                        <span class="updateAt">updateAt: ${post.updatedAt}</span>
                    </div>
                    <div class="postBtnBlock">
                        <option class="currentPostText" value="${post.text}"></option>
                        <bootton id="updateCurrentPost" class="updatePost">UPDATE</bootton> 
                        <bootton id="deleteCurrentPost" class="deletePost">DELETE</bootton>
                        <span class="postId">${post._id}</span> 
                        <option class="curentPostId" value="${post._id}"></option>
                    </div>
                </div>`
        } else {
            innerHTML += `
                <div class="post">
                    <p class="text">${post.text}</p>
                    <div class="timestamp">
                        <span class="createAt">createAt: ${post.createdAt}</span>
                        <span class="updateAt">updateAt: ${post.updatedAt}</span>
                    </div>
                </div>`
        }

    }
return `
    <div class=mainPosts>${header + userPosts + innerHTML}</div>
`
}

function pageForUserUpdate(currentUser)
    {
        return `
    <div class="fonUpdateUser">
       <div class="updateForm">
            <button class="closeUpdate">&times</button>
            <input class="nameUpdate" type="text" value= ${currentUser.name}>
            <input class="emailUpdate" type="text" value= ${currentUser.email}>
            <input class="ageUpdate" type="number" value= ${currentUser.age}>
            <button class="sendToUpdate">Send form</button>
       </div>
    </div>
    `
    }

function pageForUserCreate()
    {
        return `
        <div class="createPage">
            <div class="createForm">
                <button class="closeCreate">&times</button>
                <input class="nameCreate" type="text" placeholder="name">
                <input class="emailCreate" type="text" placeholder="email">
                <input class="passwordCreate" type="text" placeholder="password">
                <input class="ageCreate" type="number" placeholder="age">
                <button class="sendToCreate">Send form</button>
            </div>
        </div>
    `
    }
function pageForPostCreate() {
    return `<div class="createPagePost">
                <div class="newPostBlock">
                    <button class="closeBtnPost">&times</button>
                    <textarea class="textUser" placeholder="YOUR MESSAGE"></textarea>
                    <button class="sendPost">SEND POST</button>
                </div>
            </div>`
}
function pageForPostUpdate(oldMessage) {
    return `<div class="createPagePost">
                <div class="newPostBlock">
                    <button class="closeBtnPost">&times</button>
                    <textarea class="textUser" placeholder="YOUR MESSAGE">${oldMessage}</textarea>
                    <button class="sendPost">SEND POST</button>
                </div>
            </div>`
}
