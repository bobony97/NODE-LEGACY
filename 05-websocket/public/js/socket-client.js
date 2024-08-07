//ACA SE ENCUENTRA LA INFORMACION DE LOS SOCKETS CON EL CLIENTE

//Referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const textMessage = document.querySelector('#textMessage');
const btnSend = document.querySelector('#btnSend');

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

//Se va enviar la informacion del input al servidor
btnSend.addEventListener('click', () => {
    const message = textMessage.value;
    console.log(message);

    const payload = {
        message,
        id: '123456',
        date: new Date().getTime()
    }

    //Envía la información al servidor
    socket.emit('send-message', payload);
});

