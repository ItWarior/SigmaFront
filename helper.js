function triggerUpdateUser() {
    content.innerHTML = pageForUserUpdate(CURRENT_USER);

    const closeBtn = document.querySelector('.closeUpdate');
    const sendBtn = document.querySelector('.sendToUpdate');
    const name = document.querySelector('.nameUpdate');
    const email = document.querySelector('.emailUpdate');
    const age = document.querySelector('.ageUpdate');

    sendBtn.onclick = async () => {
        if (name.value && email.value && age.value) {
            const newInfoToUpdate = new UserToUpdate(name.value, email.value, Number(age.value));
            await updateCurrentUser(getAccessToken(), newInfoToUpdate);
        }
        console.log('Data is invalid')
    }
    closeBtn.onclick = () => {
        mainPage();
    }
}

function triggerCreateUser() {
    content.innerHTML = pageForUserCreate();

    const closeBtn = document.querySelector('.closeCreate');
    const name = document.querySelector('.nameCreate');
    const email = document.querySelector('.emailCreate');
    const password = document.querySelector('.passwordCreate');
    const age = document.querySelector('.ageCreate');
    const sendFormBtn = document.querySelector('.sendToCreate');

    sendFormBtn.onclick = async () => {
        if (name.value && email.value && password.value && age.value) {
            const newUserToCreate = new UserToCreate(name.value, email.value, password.value, age.value);
            await createUser(getAccessToken(), newUserToCreate);
        }
        console.log('Data is invalid');
    }
    closeBtn.onclick = () => {
        usersPage(USERS)
    }
}

function triggerCreatePost() {
    content.innerHTML = pageForPostCreate();

    const closeBtnPost = document.querySelector('.closeBtnPost');
    const newPost = document.querySelector('.textUser');
    const sendPost = document.querySelector('.sendPost');

    sendPost.onclick = async () => {
        if (newPost.value) {
            await createPost(getAccessToken(), {text: newPost.value});
        }
        console.log('Data is invalid');
    }
    closeBtnPost.onclick = () => {
        postsPageFromMain(POSTS)
    }
}

function triggerUpdatePost(oldMessage, postId) {
    content.innerHTML = pageForPostUpdate(oldMessage);

    const closeBtnPost = document.querySelector('.closeBtnPost');
    const newPost = document.querySelector('.textUser');
    const sendPost = document.querySelector('.sendPost');

    sendPost.onclick = async () => {
        if (newPost.value) {
            await updatePost(getAccessToken(), newPost.value, postId)
        }
        console.log('Data is invalid');
    }
    closeBtnPost.onclick = () => {
        postsPageFromMain(POSTS)
    }
}
