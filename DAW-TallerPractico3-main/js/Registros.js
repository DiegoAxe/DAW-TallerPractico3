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
//Variables Extras
var Fecha = document.getElementById("Fecha");
var btnRegistro = document.getElementById("Registro");
var btnReiniciar = document.getElementById("Reiniciar");
var Contador = 0;

//Arrays
var ArrayDatos = new Array();
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

    validarDUI: function(datoDUI){
        //Validaciond de números de DUI 
        //Se debe de delimitar que sean 8 caracteres "Se agrega el ^" para que no cuente otro caracter al principio
        //Luego con los D{Delimitamos los num} ya gregamos "-" por si se digita con el guión del Dui
        //Para al final despues del guión hacer que lea un digito más
        if (this.patronDui.test(datoDUI) == false){
            alert("Por favor verifique la casilla DUI");
            return false;
        }else{
            return true;
        }  
    },
    validarNIT: function(datoNIT){
        //Validacion del numero de NIT
        //En el caso de la validacion del numero de nit es más de lo anterior
        //Debemos validar que no exista un numero demás, y vamos delimitando la cantidad de digitos despues de un guión 
        if(this.patronNit.test(datoNIT)==false){
            alert("Por favor verifique la casilla NIT");
            return false;
        }else{
            return true;
        }
    },
    validarPlaca: function(datoPlaca){
        //Validacion de placa de carro
        //En el caso de la validacion de la placa de un carro debemos de delimitar el tipo de placa
        //Por ejemplo puede ser la placa de una moto "M" o de un carro particular "P"
        //Luego hacemos que valide que existen 6 numeros correspondientes a la placa luego de delimitar el tipo
        if(this.patronPlaca.test(datoPlaca)==false){
            alert("Por favor verifique la casilla Placa");
            return false;
        }else{
            return true;
        }
    },

    EscrituraEnTabla: function(Nom,D,N,Marc,Mode,An,Col,Plac,Fall,Fech){
        this.Nombre = Nom;    this.DUI = D;          this.NIT = N;           this.Marca = Marc;      this.Modelo = Mode;    
        this.Ano = An;        this.Color = Col;      this.Placa = Plac;      this.Fallas = Fall;     this.Fecha = Fech;

        document.getElementById('RegistrosDetallados').insertRow(-1).innerHTML = "<td>"+(Contador+1)+"</td><td>"+this.Fecha+"</td>"+
            "<td>"+ this.Nombre+"</td><td>"+this.DUI+"</td><td>"+this.NIT+"</td><td>"+this.Marca+"</td><td>"+this.Modelo+"</td>"+
            "<td>"+this.Ano+"</td><td>"+this.Color+"</td><td>"+this.Placa+"</td><td>"+this.Fallas+"</td>";
    }

}

btnRegistro.onclick = ProcesoRegistro =>{
    //Validara que ningun dato este vacio
    if(Nombre.value == "" || DUI.value == "" || NIT.value == "" || Ano.value == "" || 
    Placa.value == "" || Fallas.value == "" || Fecha.value == ""){
    alert("Error, un valor ha quedado como vacio");
    } else{
        //Aqui validara si se han escrito el DUI, NIT y Placa de acuerdo al patron
        var validaDUI = Carro.validarDUI(DUI.value);
        var validaNIT = Carro.validarNIT(NIT.value);
        var validaPlaca=Carro.validarPlaca(Placa.value);

        if(validaDUI == true && validaNIT== true && validaPlaca == true){
            alert("Informacion escrita correctamente. Creando un registro.");

            ArrayDatos[Contador] = Object.create(Carro);
            ArrayDatos[Contador].EscrituraEnTabla(Nombre.value, DUI.value, NIT.value, Marca.value, Modelo.value, Ano.value, Color.value, Placa.value, Fallas.value, Fecha.value);
            Contador++;

            localStorage.setItem('ArrayDatos', JSON.stringify(ArrayDatos));

        }
    }
}

btnReiniciar.onclick = BorrarDatos =>{
    alert("Datos borrados correctamente");
    localStorage.removeItem('ArrayDatos');
}


if (localStorage.getItem('ArrayDatos')) {
    ArrayDatos = JSON.parse(localStorage.getItem("ArrayDatos"));
    Contador = ArrayDatos.length;
    for(var i=0; i<ArrayDatos.length;i++){
        var ObjTemporal = ArrayDatos[i];
        document.getElementById('RegistrosDetallados').insertRow(-1).innerHTML = "<td>"+(i+1)+"</td><td>"+ObjTemporal.Fecha+"</td>"+
            "<td>"+ ObjTemporal.Nombre+"</td><td>"+ObjTemporal.DUI+"</td><td>"+ObjTemporal.NIT+"</td><td>"+ObjTemporal.Marca+"</td><td>"+ObjTemporal.Modelo+"</td>"+
            "<td>"+ObjTemporal.Ano+"</td><td>"+ObjTemporal.Color+"</td><td>"+ObjTemporal.Placa+"</td><td>"+ObjTemporal.Fallas+"</td>";
    }
}
