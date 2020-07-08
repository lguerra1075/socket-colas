const fs = require("fs");

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{

    constructor(){
        
        this.ultimo = 0;
        this. hoy = new Date().getDate();
        this.pendingTickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');
        
        if( data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.pendingTickets = data.pendingTickets;
            this.lastFour = data.lastFour;
        }else{
            this.reiniciarConteo();
        }

    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.pendingTickets.push(ticket);
        

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`; 
    }

    getUltimos4(){
        return this.lastFour; 
    }

    atenderTicket(escritorio){
        if(this.pendingTickets.length === 0){
            return 'no hay tickets';
        }

        let numeroTicket = this.pendingTickets[0].numero;
        this.pendingTickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.lastFour.unshift( atenderTicket );

        if(this.lastFour.length > 4){
            this.lastFour.splice(-1, 1);
        }
        console.log(this.lastFour);
        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.pendingTickets = [];
        this.lastFour = [];
        console.log(`Se ha inicializado el sistema`);
        this.grabarArchivo();
    }


    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            pendingTickets: this.pendingTickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

        
    }
}


module.exports = {
    TicketControl
}