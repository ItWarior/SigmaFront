//Error to console
async function isError(response) {
    if (response.ok) {
        return {status: false}
    }

    const {message} = await response.json();

    console.log('Error')
    console.log(`code: ${response.status}`);
    console.log(`message:  ${response.statusText}`);
    console.log(message);
    return { status: true, message};
}
