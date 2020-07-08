

var socket = io();

var label = $('#lblNuevoTicket');
socket.on('connect', function(){
    console.log('conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('desconetado al servidor');
});

socket.on('estadoActual', (estadoActual) => {
    label.text(estadoActual.actual);
});

$('button').on('click', function(){
    console.log('click aqui');

    socket.emit('siguienteTicket', null, function(siguienteTicket){

        label.text(siguienteTicket);

    });
})