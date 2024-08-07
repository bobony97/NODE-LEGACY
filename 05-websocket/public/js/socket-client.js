//ACA SE ENCUENTRA LA INFORMACION DE LOS SOCKETS CON EL CLIENTE

//Referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const textMessage = document.querySelector('#textMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

//Esto va a escuchar el mensaje que envia el servidor
socket.on('send-message', (payload) => {
    console.log(payload)
});

//Se va enviar la informacion del input al servidor
btnSend.addEventListener('click', () => {
    const message = textMessage.value;

    const payload = {
        message,
        id: '123456',
        date: new Date().getTime()
    }

    //Envía la información al servidor
    socket.emit('send-message', payload);
});

