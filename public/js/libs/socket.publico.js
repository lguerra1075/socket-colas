
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');


var labelTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var labelEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', (resp) =>{
    console.log(resp);
    actualizaHTML(resp.ultimos4)
});

socket.on('ultimos4', (resp) =>{
    console.log(resp);    

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play;

    actualizaHTML(resp.ultimos4)
});

function actualizaHTML(ultimos4){

    for(var i = 0; i < ultimos4.length; i++){
        labelTickets[i].text('Ticket '+ ultimos4[i].numero);
        labelEscritorios[i].text('Escritorio '+ ultimos4[i].escritorio);
    }

}