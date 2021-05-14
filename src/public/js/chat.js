const socket = io()
//console.log('It works');

window.onload = enterpage;

function enterpage(){
    socket.emit('users_num');
}

socket.on('users_num', function(act_users){
    //console.log(act_users);
    users.innerHTML = ``
    users.innerHTML = `${act_users}`
});
