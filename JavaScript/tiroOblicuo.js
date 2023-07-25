/**
 * Comprueba si los valores ingresados son correctos, sino salta un alert con el error y resetea los valores
 * @method correct
 * @param {string} id - Id del input del formulario
 * @param {number} valor - Valor ingresado por el usuario
 */
let correct = (id, valor) => {
    if(valor.includes(",")) {
        valor = valor.replace(",",".");
    }
    //Creación de variables
    let ang, ang2, vel,vel2,grav,grav2;
    ang = document.getElementById("angulo").value;
    ang2 = document.getElementById("angulo");
    vel = document.getElementById("velocidad").value;
    vel2 = document.getElementById("velocidad");
    grav = document.getElementById("gravedad").value;
    grav2 = document.getElementById("gravedad");

    if (id==="angulo") {
        document.getElementById("angulo").value = valor;
        if (ang<0 || ang>360 || isNaN(ang)){
            alert("Ángulo mal ingresado, vuelva a ingresar");
            ang2.value = '';
        }

    }else if (id==="velocidad"){
        document.getElementById("velocidad").value = valor;
        if (vel<0 || vel>50 || isNaN(vel)){
            alert("Velocidad mal ingresado, vuelva a ingresar");
            vel2.value = '';
        }
    }else if (id==="gravedad"){
        document.getElementById("gravedad").value = valor;
        if (grav<1 || grav>20 || isNaN(grav)){
            alert("Gravedad mal ingresado, vuelva a ingresar");
            grav2.value = '';
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
    const escala = 10; // Escala para ajustar el tamaño de la gráfica y los ejes
    const intervaloMarcas = 50; // Intervalo entre marcas en los ejes

    //calculos
    let time=(2 * vel *Math.sin(angRad))/grav; //TiempoVuelo
    let ymax = ((Math.pow(vel,2))* Math.pow(Math.sin(angRad),2))/(2* grav); //AlturaMaxima
    let xmax = (Math.pow(vel,2)* Math.sin(2* angRad))/grav; //AlcanceMaximo

    //Canvas
    ctx.clearRect(0, 0, anchomax, alturaMax);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    //Ejes
    const origenX = 0;
    const origenY = alturaMax;
    const finEjeX = anchomax;
    const finEjeY = 0;

    //Trayectoria
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;

    let i = 0;
    let x = 0;
    let y = 0;

    while (i <= time){
        x = vel * Math.cos(angRad) * i * escala; //Posición horizontal
        y = alturaMax - (vel * Math.sin(angRad) * i - (0.5 * grav * Math.pow(i,2))) * escala; //Posición vertical

        if(x > anchomax || y<0){
            break; //Si la posición horizontal supera el ancho máximo del canvas, se sale del bucle y tmb si supera la altura
        }

        ctx.lineTo(x,y);

        i += 0.1;
    }

    ctx.stroke();

    // Eje X con marcas y etiquetas
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(origenX, origenY);
    ctx.lineTo(finEjeX, origenY);
    ctx.stroke();

    for (let posX = intervaloMarcas; posX <= finEjeX; posX += intervaloMarcas) {
        ctx.beginPath();
        ctx.moveTo(posX, origenY - 5);
        ctx.lineTo(posX, origenY + 5);
        ctx.stroke();
    }

    // Eje Y con marcas y etiquetas
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(origenX, origenY);
    ctx.lineTo(origenX, finEjeY);
    ctx.stroke();

    for (let posY = intervaloMarcas; posY <= origenY; posY += intervaloMarcas) {
        ctx.beginPath();
        ctx.moveTo(origenX - 5, posY);
        ctx.lineTo(origenX + 5, posY);
        ctx.stroke();
    }
            showResult(ymax, time, xmax);
}

/**
 * Se encarga de asignarle los valores calculados en la funcion graficarTiroOblicuo() al recuadro de los resultados
 * @method showResult
 * @param {number} altMax - altura maxima calculado en la funcion graficarTiroOblicuo()
 * @param {number} tiempoVuelo - tiempo que transcurre entre la altura inicial y la altura maxima alcanzada, tiempo total de vuelo
 * @param {number} alcMax - alcance maximo calculado en la funcion graficarTiroOblicuo()
 */
let showResult = (altMax,tiempoVuelo,alcMax) => {
    let formulario = document.getElementById("unity");
    if (altMax < 0 || tiempoVuelo < 0 || alcMax < 0){
        alert("Con los datos que usted ingreso, los calculos dan valores improbables, por favor cambie los datos");
        formulario.reset();

    }else{
        document.getElementById("altmax").textContent = altMax.toFixed(2);
        document.getElementById("tiempovuelo").textContent = tiempoVuelo.toFixed(2);
        document.getElementById("distRecorrida").textContent = alcMax.toFixed(2);
    }
}