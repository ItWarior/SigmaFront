logInPage();

//DOM PAGES
function logInPage() {

    menu.innerHTML = startMenuComponent();
    content.innerHTML = startBodyComponent();

    const postHref = document.querySelector('.posts');
    postHref.onclick = async (ev) => {
        await signInPostPage(ev);
    }
    const loginPage = document.querySelector('.login');
    loginPage.onclick = () => {
        logInPage();
    }
    const sendFormBtn = document.querySelector('#sendFormBtn');
    sendFormBtn.onclick = async (ev) => {
        await logIn(ev);
    }

}//startPage
function postsPageAtBegin(posts) {
    menu.innerHTML = startMenuComponent();
    content.innerHTML = startBodyPostsComponent(posts);

    const postHref = document.querySelector('.posts');
    postHref.onclick = async (ev) => {
        await signInPostPage(ev);
    }
    const loginPage = document.querySelector('.login');
    loginPage.onclick = () => {
        logInPage();
    }
}//postsPage at the begin

function mainPage(helpInfo) {
    menu.innerHTML = mainMenuComponent(helpInfo);
    content.innerHTML = mainBodyComponent(helpInfo);

    const mainHref = document.querySelector('.main');
    mainHref.onclick = () => {
        mainPage(helpInfo);
    }

    const postsHref = document.querySelector('.posts');
    postsHref.onclick = async (ev) => {
        await signInPostPageFromMain(ev);
    }
    const userHref = document.querySelector('.users');
    userHref.onclick = async () => {
        await signInUserPageFromMain(getAccessToken());
    }
    const loginPage = document.querySelector('.logOut');
    loginPage.onclick = async () => {
        await logOut(getAccessToken());
    }
    const deleteButton = document.querySelector('.delete');
    deleteButton.onclick = async () => {
        const answer = window.confirm('you really want to delete your page?');
        if (answer) {
            await deleteCurrentUser(getAccessToken());
        }
    }
    const updateButton = document.querySelector('.update');
    updateButton.onclick = async () => {
        triggerUpdateUser();
    }

}//mainPage

function postsPageFromMain(posts) {
    menu.innerHTML = mainMenuComponent('PAGE POSTS');
    content.innerHTML = mainBodyPostsComponent(posts);

    const mainHref = document.querySelector('.main');
    mainHref.onclick = () => {
        mainPage(CURRENT_USER.name);
    }
    const postHref = document.querySelector('.posts');
    postHref.onclick = async () => {
        await signInPostPageFromMain();
    }
    const userPage = document.querySelector('.users');
    userPage.onclick = async () => {
        await signInUserPageFromMain(getAccessToken());
    }
    const loginPage = document.querySelector('.logOut');
    loginPage.onclick = async () => {
        await logOut(getAccessToken());
    }
    const createBtn = document.querySelector('.createPostPage');
    createBtn.onclick = async () => {
        triggerCreatePost();
    }
    const findPostBtn = document.querySelector('.findPostBtn');
    findPostBtn.onclick = async () => {
            const userId = document.querySelector('.findPostInput');
        if (userId.value) {
            await findPostByUserId(getAccessToken(), userId.value)
        }
        console.log('Data is invalid');
    }

    const mainPostPage = document.querySelector('.mainPosts');
    mainPostPage.onclick = async (ev) => {
        const postId = ev.target.parentElement.lastElementChild.value;
        const oldMessage = ev.target.parentElement.firstElementChild.value;

        if(ev.target.id === 'updateCurrentPost'){
            if (oldMessage && postId){
                triggerUpdatePost(oldMessage, postId);
            }else {
                console.log('Data is invalid');
            }
        }

        else if(ev.target.id === 'deleteCurrentPost'){
            if (postId) {
                await deletePost(getAccessToken(), postId);
            }else{
                console.log('Data is invalid');
            }
        }
    }
}//postsPage inside site

function usersPage(users) {
    menu.innerHTML = mainMenuComponent('PAGE USERS');
    content.innerHTML = mainBodyUsersComponent(users);

    const mainHref = document.querySelector('.main');
    mainHref.onclick = () => {
        mainPage(CURRENT_USER.name);
    }
    const postHref = document.querySelector('.posts');
    postHref.onclick = async () => {
        await signInPostPageFromMain();
    }
    const userHref = document.querySelector('.users');
    userHref.onclick = async () => {
        await signInUserPageFromMain(getAccessToken());
    }
    const loginPage = document.querySelector('.logOut');
    loginPage.onclick = async () => {
        await logOut(getAccessToken());
    }
    const createUerBtn = document.querySelector('.createUserPage');
    createUerBtn.onclick = () => {
        triggerCreateUser()
    }
    const findUserBtn = document.querySelector('.findUserBtn');
    findUserBtn.onclick = async () => {
            const findUserInput = document.querySelector('.findUserInput');
        if (findUserInput.value) {
            await findUserById(getAccessToken(), findUserInput.value)
        }
        console.log('Data is invalid');

    }

}//userPage
