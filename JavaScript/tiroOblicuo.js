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
let graficarTiroOblicuo = () => {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    const alturaMax = canvas.height;
    const anchomax = canvas.width;

    //Obtener los valores de los inputs
    let ang, vel, grav, angRad;
    ang = parseFloat(document.getElementById("angulo").value);
    vel = parseFloat(document.getElementById("velocidad").value);
    grav = parseFloat(document.getElementById("gravedad").value);

    angRad = (ang * Math.PI) / 180; //pase de grados a radianes para utilizar correctamente las funciones Math
    //constantes
    const escalaX = 10;
    const escalaY = 10;

    //calculos
    let time= Number((2*vel*Math.sin(angRad))/grav).toFixed(2); //TiempoVuelo
    let ymax = Number(((Math.pow(vel,2))*Math.pow(Math.sin(angRad),2))/2*grav).toFixed(2); //AlturaMaxima
    let xmax = Number((Math.pow(vel,2)*Math.sin(2*angRad))/grav).toFixed(2); //AlcanceMaximo

    //Canvas
    ctx.clearRect(0,0,anchomax,alturaMax);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    //Ejes
   const origenX = 0;
   const origenY = alturaMax;

    //EjeX
    ctx.beginPath();
    ctx.moveTo(origenX,origenY);
    ctx.lineTo(anchomax,origenY);
    ctx.stroke();
    //EjeY
    ctx.beginPath();
    ctx.moveTo(origenX,0);
    ctx.lineTo(origenX,origenY);
    ctx.stroke();

    //Trayectoria
    ctx.beginPath();
    ctx.moveTo(origenX,origenY);

    let i = 0;
    let x = origenX;
    let y = origenY;

    while (i <= time){
        x = origenX + vel * Math.cos(angRad) * i * escalaX; //Posición horizontal
        y = origenY - (vel * Math.sin(angRad) * i - (0.5 * grav * Math.pow(i,2))) * escalaY; //Posición vertical

        ctx.lineTo(x,y);

        i += 0.1;
    }

    ctx.stroke();
/*
    //Final Trayectoria
    ctx.beginPath();
    ctx.arc(xmax, alturaMax -(vel * Math.sin(angRad) * time - (0.5 * grav * Math.pow(time,2))),3,0,2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
*/
    showResult(ymax,time,xmax);
}

let showResult = (altMax,tiempoVuelo,alcMax) => {
    document.getElementById("altmax").textContent = altMax.toFixed(2);
    document.getElementById("tiempovuelo").textContent = tiempoVuelo.toFixed(2);
    document.getElementById("distRecorrida").textContent = alcMax.toFixed(2);
}