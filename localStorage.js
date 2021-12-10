//local Storage
function createSessionOrOverwrite(AccessToken, RefreshToken) {
    localStorage.clear();
    localStorage.setItem('accessToken', `Bearer ${AccessToken}`);
    localStorage.setItem('refreshToken', RefreshToken);
}

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function deleteSession() {
    localStorage.clear();
}
