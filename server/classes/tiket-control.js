const fs = require('fs');

class Ticket {

    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }

}

class TiketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.restartContent()
        }

        console.log(this.tickets);

    }

    restartContent() {

        this.ultimo = 0;
        console.log('Se ha inicializado el sistema');
        this.tickets = [];
        this.ultimos4 = [];
        this.saveFile();

    }

    next() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return this.ultimo;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }


        console.log('El primer tiecket es: ', this.tickets[0]);

        let numberTicket = this.tickets[0].number;

        //Borrando el primer elemento
        this.tickets.shift();

        let atenderTicket = new Ticket(numberTicket, desktop);
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento
        }

        console.log('Ultimos 4: ', this.ultimos4);
        this.saveFile();

        return atenderTicket;
    }

    saveFile() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}

module.exports = {
    TiketControl
}