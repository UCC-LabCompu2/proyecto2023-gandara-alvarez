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
    if(isNaN(valor)){ //funcion que verifica si valor es un numero o no
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
        if (vel<0 || vel>50){
            alert("Velocidad mal ingresado, vuelva a ingresar");
            formulario.reset();
        }
    }else if (id==="gravedad"){
        document.getElementById("gravedad").value = valor;
        if (grav<1 || grav>20){
            alert("Gravedad mal ingresado, vuelva a ingresar");
            formulario.reset();
        }
    }
}

/**
 * En base a los valores ingresados calcula los resultados a mostrar y grafica el canvas
 * @method graficarTiroOblicuo
 */
let graficarTiroOblicuo = () => {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    const alturaMax = canvas.height;
    const anchomax = canvas.width;

    //Obtener los valores de los inputs
    const ang = Number(document.getElementById("angulo").value);
    const vel = Number(document.getElementById("velocidad").value);
    const grav = Number(document.getElementById("gravedad").value);

    const angRad = (ang * Math.PI) / 180; //pase de grados a radianes para utilizar correctamente las funciones Math
    //constantes
    const escalaX = 10;
    const escalaY = 10;

    //calculos
    let time=(2 * vel *Math.sin(angRad))/grav; //TiempoVuelo
    let ymax = ((Math.pow(vel,2))* Math.pow(Math.sin(angRad),2))/(2* grav); //AlturaMaxima
    let xmax = (Math.pow(vel,2)* Math.sin(2* angRad))/grav; //AlcanceMaximo

    //Canvas
    ctx.clearRect(0, 0, anchomax, alturaMax);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";

    //Ejes
    const origenX = anchomax/2; //centro horizontal
    const origenY = alturaMax/2; //centro vertical

    //EjeX
    ctx.beginPath();
    ctx.moveTo(0,origenY);
    ctx.lineTo(anchomax,origenY);
    ctx.stroke();

    //EjeY
    ctx.beginPath();
    ctx.moveTo(origenX,0);
    ctx.lineTo(origenX,alturaMax);
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
    showResult(ymax,time,xmax);
}
/**
 * Se encarga de asignarle los valores calculados en la funcion graficarTiroOblicuo() al recuadro de los resultados
 * @method showResult
 * @param {number} altMax - altura maxima calculado en la funcion graficarTiroOblicuo()
 * @param {number} tiempoVuelo - tiempo que transcurre entre la altura inicial y la altura maxima alcanzada, tiempo total de vuelo
 * @param {number} alcMax - alcance maximo calculado en la funcion graficarTiroOblicuo()
 */
let showResult = (altMax,tiempoVuelo,alcMax) => {
    document.getElementById("altmax").textContent = altMax.toFixed(2);
    document.getElementById("tiempovuelo").textContent = tiempoVuelo.toFixed(2);
    document.getElementById("distRecorrida").textContent = alcMax.toFixed(2);
}