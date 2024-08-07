const socketController = (socket) => {
    console.log('Cliente Conectado', socket.id); //Imprime en la consola un mensaje indicando que un cliente se ha conectado, junto con el id único del socket correspondiente 
                                                //a ese cliente.
                                                
    //Configura un manejador de eventos para el evento disconnect. Este evento se emite cuando el cliente se desconecta del servidor.
    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id);
    });

    //Recibiendo informacion del cliente
    // socket.on('send-message', ( payload ) => {  //El "send-message", es la informacion que el cliente esta emitiendo
    //     console.log('Mensaje recibido ', payload);
    // });

    //Esto va a emitir un mensaje a todos los usuarios conectados
    // socket.on('send-message', ( payload ) => {
        //El "this.io" es cuando envia el socket el mensaje, por lo tanto no va a chocar con el "send-message" del cliente
        // this.io.emit('send-message', payload);
    // });

    //Se envia la informacion por id de cliente
    socket.on('send-message', ( payload, callback ) => {
        const id = 123456;
        callback(id);

        //Con esto podemos enviar informacion al cliente que envio informacion
        // socket.emit('send-message', payload)

        // Con esto podemos enviar informacion a todos los cliente excepto a quien envio la informacion
        socket.broadcast.emit('send-message', payload)
    }); 
};

module.exports = {
    socketController
};