window.socketioreact = io.connect('http://localhost:3005');
window.react_uid = Math.random()*1000;
window.socketioreact.on('connect', function () {
    window.socketioreact.emit('login', window.react_uid);
    window.socketioreact.on('login-success', (res) => {
        console.log(res);
    });
});
