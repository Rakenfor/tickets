//Establece la comunicion

let socket = io();

let label = $('#newTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

$('button').on('click', function() {

    socket.emit('nextTicket', {}, function(nextTicket) {
        label.text(nextTicket);
    });

});

socket.on('load', function(data) {
    label.text(data.state);
})