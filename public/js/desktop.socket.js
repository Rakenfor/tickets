let socket = io();

let searchParams = new URLSearchParams(window.location.search);



if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

let label = $('small')

let desktop = searchParams.get('escritorio');
console.log(desktop);
$('h1').text('Escritorio: ' + desktop)

$('button').on('click', function() {
    socket.emit('atenderTicket', { desktop: desktop }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp)
            alert(resp);
            return
        }

        label.text('Ticket: ' + resp.number);
    });
});