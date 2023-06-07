//Variables Globales
var vx;
var vy;
var tv;
var x;
var y;
var t=0; //TiempoVuelo
var xmax; //AlcanceMaximo
var ymax; //alturaMaxima
var posTop;
var beginmove;

/**
 * Comprueba si los valores ingresados son correctos, sino salta un alert con el error y resetea los valores
 * @method correct
 * @param {string} id - Id del input del formulario
 * @param {number} valor - Valor ingresado por el usuario
 */
let correct = (id, valor) => {
    if(valor.includes(",")){
        valor = valor.replace(",",".");
    }
    //Creación de variables
    let ang, vel, grav, formulario;
    ang = document.getElementById("angulo").value;
    vel = document.getElementById("velocidad").value;
    grav = document.getElementById("gravedad").value;
    formulario = document.getElementById("unity");
    if(isNaN(valor)){
        alert("Se ingreso un valor invalido en "+ id);
        formulario.reset(); //funcion que resetea el formulario si es que se ingreso un valor que no es un numero

    } else if (id==="angulo"){
        document.getElementById("angulo").value = valor;
        if (ang<0 || ang>360){
            alert("Ángulo mal ingresado, vuelva a ingresar");
            formulario.reset();
        }

    }else if (id==="velocidad"){
        document.getElementById("velocidad").value = valor;
        if (vel<0 || vel>100){
            alert("Velocidad mal ingresado, vuelva a ingresar");
            formulario.reset();
        }
    }else if (id==="gravedad"){
        document.getElementById("gravedad").value = valor;
        if (grav<1 || grav>100){
            alert("Gravedad mal ingresado, vuelva a ingresar");
            formulario.reset();
        }
    }
    calcular(ang,vel,grav);
}

let calcular = (valor1, valor2, valor3) => {
    t = Number((2*vel*Math.sin(ang))/grav).toFixed(2);
    ymax = Number(((Math.pow(vel,2))*Math.pow(Math.sin(ang),2))/2*grav).toFixed(2);
    xmax = Number((Math.pow(vel,2)*Math.sin(2*ang))/grav).toFixed(2);

    document.getElementById("altmax").value = ymax;
    document.getElementById("tiempovuelo").value = t;
    document.getElementById("distRecorrida").value = xmax;
}

/**
 * Genera las lineas verticales y horizontales para el cuadriculado del canvas
 * @method dibujarCuadriculado
 */

/**
 * En base a los valores ingresados calcula los resultados a mostrar
 * @method calculate
 * @param {...} ... - ...
 * @param {...} ... - ...
 */
let calculate = () => {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    const alturaMax = canvas.height;
    const anchomax = canvas.width;
    let paso = 20;
    let h = 15;
    ctx.fillRect(0,0,anchomax , alturaMax);

    //Lineas Horizontales
    for (let i = paso; i < alturaMax; i += paso) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(anchomax, i);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.closePath();
    }

    //Lineas Verticales
    for (let i = paso; i < anchomax; i += paso) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, alturaMax);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.closePath();
    }

    //Eje X
    ctx.beginPath();
    ctx.moveTo(0, alturaMax / 2);
    ctx.lineTo(anchomax, alturaMax / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

    //Eje Y
    ctx.beginPath();
    ctx.moveTo(anchomax / 2, 0);
    ctx.lineTo(anchomax / 2, alturaMax);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

    //Numeros Eje X
    for (let i = paso; i < anchomax; i += paso) {
        let num = (-anchomax / 2 + i) / paso;
        ctx.font = "10px Arial";

        if (num % 2 === 0 && num !== 0) {
            ctx.fillText(num, i, alturaMax / 2 + h);
        }
    }

    //Numeros Eje Y
    for (let i = paso; i < alturaMax; i += paso) {
        let num = (alturaMax / 2 - i) / paso;
        ctx.font = "10px Arial";

        if (num % 2 === 0 && num !== 0) {
            ctx.fillText(num, anchomax / 2 - h, i);
        }
    }

    //Nombre Ejes
    ctx.font = "15px Arial Bolder";
    ctx.fillText("X", anchomax - h, alturaMax / 2 - h);
    ctx.fillText("Y", anchomax / 2 + h, h);


    let ang, vel, grav;
    ang = document.getElementById("angulo").value;
    vel = document.getElementById("velocidad").value;
    grav = document.getElementById("gravedad").value;



/*
    let info = document.getElementById("resultadoFinal");
    let ang = document.getElementById("angulo").value;
    let alt = document.getElementById("altura").value;
    let veli = document.getElementById("velocidad").value;
    let grav = document.getElementById("gravedad").value;
    ang = ang * (Math.PI / 180);

    //velocidadX, velocidadY
    vx = veli * Math.cos(ang).toFixed(2);
    vy = veli * Math.sin(ang).toFixed(2);

    //tiempoVuelo
    tv = (2*vy) / grav.toFixed(2);

    //Alcance Horizontal, Altura Máxima
    xmax = (Math.pow(veli,2)*Math.sin(2*ang))/grav.toFixed(2);
    ymax = (Math.pow(vy,2)/2*grav).toFixed(2);

    beginmove = setInterval(move, 10);
    resultadoFinal.className = 'result1';
    resultadoFinal.innerHTML =
        `
        Velocidad Inicial= ${veli}
        Angulo= ${ang}
        VelocidadX= ${vx}
        VelocidadY= ${vy}
        Tiempo Vuelo= ${tv}
        Alcance Horizontal= ${xmax}
        Altura Maxima= ${ymax}
        `
  */
}

let move = () => {
    let img = document.getElementById("pelota");
    let g = document.getElementById("gravedad").value;

    if (t<=tv){
    x = vx * t;
    y = (vy * t)- ((g*Math.pow(t,2))/2).toFixed(2);
    img.style.left = x + "px";
    img.style.top = y + "px";
    } else {
        clearInterval(beginmove);
        img.style.left = xmax + "px";
        img.style.top =ymax + "px"
    }
    t+=0.1;
}

/**
 * Restablece el canvas y sus valores
 * @method restaurate
 * @param {...} ... - ...
 * @param {...} ... - ...
 */
let restaurate = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    var canvasData = ctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.putImageData(canvasData,0,0);
}