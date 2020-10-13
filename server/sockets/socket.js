const { io } = require('../server');
const { TiketControl } = require('../classes/tiket-control');

const tiketControl = new TiketControl();

io.on('connection', (client) => {

    client.emit('load', { state: tiketControl.getUltimoTicket() });

    client.on('nextTicket', (data, callback) => {
        tiketControl.next();
        console.log('Ticket: ', tiketControl.ultimo);

        callback(tiketControl.ultimo)

    });

    client.emit('actualState', {
        actual: tiketControl.getUltimoTicket(),
        ultimos4: tiketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                messaje: 'Escrtitorio necesario'
            })
        }


        let atenderTicket = tiketControl.atenderTicket(data.desktop);

        callback(atenderTicket);

        //Actualizar /  ntificar cambios utimos 4
        client.broadcast.emit('actualState', {
            actual: tiketControl.getUltimoTicket(),
            ultimos4: tiketControl.getUltimos4()
        });


    });

});