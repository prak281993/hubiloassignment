let socket = io.connect('/');

const userList = document.getElementById('user-list');

socket.on('useronline', (user) => {
    if (!userExists(user._id)) {
        let li = document.createElement('li');
        li.setAttribute('id', user._id);
        li.innerHTML = user.name;
        li.className = "list-group-item card-text";
        userList.appendChild(li);
    }
});

function userExists(id) {
    let listItems = userList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].getAttribute('id') === id) {
            return true;
        }
    }
    return false;
}

// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         console.log(xhr.responseText);
//     }
// }
// xhr.open('GET', '/getallusers');
// xhr.send();