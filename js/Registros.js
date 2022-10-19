//Variables del Dueño
var Nombre = document.getElementById("Nombre");
var DUI = document.getElementById("DUI");
var NIT = document.getElementById("NIT");
//Variables del Carro
var Marca = document.getElementById("Marca");
var Modelo = document.getElementById("Modelo");
var Ano = document.getElementById("Ano");
var Color = document.getElementById("Color");
var Placa = document.getElementById("Placa");
var Fallas = document.getElementById("Fallas");

const ModelosToyota = ["FJ Cruiser","Land Cruiser Prado","Pixis Joy"];
const ModelosHonda = ["Passport","Civic Sedán","Odyssey"];
const ModelosNissan = ["Rogue Sport","Pathfinder","Frontier"];
const ModelosSubaru = ["Crosstrek","Legacy","Ascent"];

Marca.onchange = CambioOpciones =>{
    //Limpieza de las opciones del select Modelo
    for (let i = Modelo.options.length; i >= 0; i--) {
        Modelo.remove(i);
    }

    //Crear nuevas opciones dependiendo del caso
    if (Marca.value == "Toyota"){
        for(var i = 0; i < 3; i++){
            const crear = document.createElement("option");
            crear.value = ModelosToyota[i];
            crear.text = ModelosToyota[i];
            Modelo.appendChild(crear);
        }
    }
    else if (Marca.value == "Honda"){
        for(var i = 0; i < 3; i++){
            const crear = document.createElement("option");
            crear.value = ModelosHonda[i];
            crear.text = ModelosHonda[i];
            Modelo.appendChild(crear);
        }
    }
    else if (Marca.value == "Nissan"){
        for(var i = 0; i < 3; i++){
            const crear = document.createElement("option");
            crear.value = ModelosNissan[i];
            crear.text = ModelosNissan[i];
            Modelo.appendChild(crear);
        }
    }
    else{
        for(var i = 0; i < 3; i++){
            const crear = document.createElement("option");
            crear.value = ModelosSubaru[i];
            crear.text = ModelosSubaru[i];
            Modelo.appendChild(crear);
        }
    }
      
}

//Creacion del Objeto donde se guardaran los datos
var Carro = { 
    //Informacion del Dueño
    Nombre: "",
    DUI: "",
    NIT: "",
    //Informacion sobre el carro
    Marca: "",
    Modelo: "",
    Ano: 0,
    Color: "",
    Placa: "",
    Fallas: "",
    //Info Extra
    Fecha: "",
    patronDui: /^\d{8}-\d$/,
    patronNit: /^\d{4}-\d{6}-\d{3}-\d{1}$/,
    patronPlaca: /^((M|MB|P|AU|N)\d{6})/,


}





//Validacion mediante Expresiones regulares
//Validaciond de números de DUI 
//Se debe de delimitar que sean 8 caracteres "Se agrega el ^" para que no cuente otro caracter al principio
//Luego con los D{Delimitamos los num} ya gregamos "-" por si se digita con el guión del Dui
//Para al final despues del guión hacer que lea un digito más
var patronDui = /^\d{8}-\d$/;
//------------alert(patronDui.test("06599445-0"));
//En el caso de la validacion del numero de nit es más de lo anterior
//Debemos validar que no exista un numero demás, y vamos delimitando la cantidad de digitos despues de un guión

var patronNit = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
//-------------alert(patronNit.test("0614-061103-123-0"));
//Validacion de placa de carro
//En el caso de la validacion de la placa de un carro debemos de delimitar el tipo de placa
//Por ejemplo puede ser la placa de una moto "M" o de un carro particular "P"
//Luego hacemos que valide que existen 6 numeros correspondientes a la placa luego de delimitar el tipo
var patronPlaca = /^((M|MB|P|AU|N)\d{6})/;
//--------------alert(patronPlaca.test("581987"))
