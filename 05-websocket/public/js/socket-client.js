//ACA SE ENCUENTRA LA INFORMACION DE LOS SOCKETS CON EL CLIENTE

//Referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});