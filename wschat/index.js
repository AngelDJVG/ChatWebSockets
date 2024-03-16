

var ws;
var usuarioActual;
var listaMensajes = document.getElementById("lista-mensajes");
var listaSesiones = document.getElementById("lista-sesiones");
var sessionHeader = document.getElementById("sesion-actual");
var comboboxSesiones = document.getElementById("combobox-id");
var mensajeCheckbox = document.getElementById("mensaje-checkbox");


function conectarWebSocket() {
    ws = new WebSocket("ws://localhost:8080/MsgWebSocket/wsendpoint");

    ws.onopen = function (event) {
        console.log("Conectado al servidor WebSocket");
        sessionHeader.innerText = "Sesión actual: " + ws.id;
    };

    ws.onmessage = function (event) {
        var mensaje = event.data;

        if (mensaje.startsWith("Open: ")) {
            manejarEntradaSesion(mensaje);
        } else if (mensaje.startsWith("Close: ")) {
            manejarSalidaSesion(mensaje);
        } else if (mensaje.startsWith("SessionID: ")) {
            usuarioActual = mensaje.substring(10);
            sessionHeader.innerText = "Sesión actual: " + usuarioActual;
        } else {
            manejarMensajeRegular(mensaje);
        }
    };
}

function manejarEntradaSesion(mensaje) {
    var idSesion = mensaje.substring(6);
    var option = document.createElement("option");
    option.value = idSesion;
    option.text = "ID: " + idSesion;
    comboboxSesiones.appendChild(option);
}


function manejarSalidaSesion(mensaje) {
    var idSesion = mensaje.substring(7);
    var options = comboboxSesiones.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].value === idSesion) {
            comboboxSesiones.remove(i);
            break;
        }
    }
}


function manejarMensajeRegular(mensaje) {
    var jsonObject = JSON.parse(mensaje);

    var emisor = jsonObject.Emisor;
    var destinatario = jsonObject.Destinatario.toLowerCase();
    

    agregarMensajeLista(emisor, destinatario, jsonObject);
    agregarSesionTabla(jsonObject);
}

function agregarMensajeLista(emisor, destinatario, jsonObject) {
    var mensajeJson = jsonObject.Mensaje;
    var li = document.createElement("li");
    var destinatarioTexto = (destinatario !== "todos") ? destinatario : "ti";
    li.appendChild(document.createTextNode("de " + emisor + " - para " + destinatarioTexto + ": " + mensajeJson));
    listaMensajes.appendChild(li);
}

function agregarSesionTabla(jsonObject) {
    var alumnoJson = jsonObject.Alumno;
    var nombre = alumnoJson.Nombre;
    var calificaciones = alumnoJson.Calificacion;

    var tablaSesiones = document.getElementById("lista-sesiones").getElementsByTagName('tbody')[0];
    var fila = tablaSesiones.insertRow();
    var celdaNombre = fila.insertCell(0);
    var celdaCalificaciones = fila.insertCell(1);
    celdaNombre.innerHTML = nombre;
    celdaCalificaciones.innerHTML = calificaciones;
}

function crearMensaje() {
    var destinatario = document.getElementById('combobox-id').value;
    var mensaje = document.getElementById("mensaje-input").value;
    const jotason = {
        "Emisor": usuarioActual,
        "Destinatario": destinatario,
        "Mensaje": mensaje
    };

    const jsonString = JSON.stringify(jotason);
    return jsonString;
}

function enviarMensaje() {
    var input = document.getElementById("mensaje-input");

    var jotason = {};
    if (ws.readyState === WebSocket.OPEN) {

        if (mensajeCheckbox.checked) {
            jotason = crearMensaje();
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("YO: " + input.value));
            listaMensajes.appendChild(li);
            input.value = "";
        }else{
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("*Enviaste un alumno*" ));
            listaMensajes.appendChild(li);
            jotason = crearAlumno();
        }
        ws.send(jotason);

    } else {
        console.log("La conexión WebSocket no está abierta.");
    }
}

function checarCheckbox() {

}

function crearAlumno() {
    var destinatario = document.getElementById('combobox-id').value;
    var nombre = document.getElementById("nombre-input").value;
    var calificaciones = document.getElementById("calificaciones-input").value;
    const jotason = {
        "Emisor": usuarioActual,
        "Destinatario": destinatario,
        "Mensaje": "*-Alumno-*",
        "Alumno": {
            "Nombre": nombre,
            "Calificacion": calificaciones
        }
    }
    const jsonString = JSON.stringify(jotason);
    return jsonString;
}



conectarWebSocket();