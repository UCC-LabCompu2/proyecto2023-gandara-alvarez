/**
 * Comprueba si los valores ingresados son correctos, sino salta un alert con el error y resetea los valores
 * @method correct
 * @param {string} id - Id del input del formulario
 * @param {number} valor - Valor ingresado por el usuario
 */
let correct = (id, valor) => {
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


    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const alturaMax = canvas.height;
    const anchomax = canvas.width;

    //Obtener los valores de los inputs
    const ang = Number(document.getElementById("angulo").value);
    const vel = Number(document.getElementById("velocidad").value);
    const grav = Number(document.getElementById("gravedad").value);

    const angRad = (ang * Math.PI) / 180; //pase de grados a radianes para utilizar correctamente las funciones Math

    //constantes
    const escala = 5; // Escala para ajustar el tamaño de la gráfica y los ejes
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

    // Dibujar los ejes
// Eje X con marcas
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

        // Añadir el valor de la marca
        ctx.font = '12px Arial';
        ctx.fillText(posX / escala, posX, origenY - 15); // Mostrar el valor de la marca encima del eje X
    }

// Eje Y con marcas
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

        // Añadir el valor de la marca
        ctx.font = '12px Arial';
        ctx.fillText((origenY - posY) / escala, origenX + 15, posY); // Mostrar el valor de la marca a la derecha del eje Y
    }
    // Función para dibujar el proyectil en una posición específica
    function dibujarProyectil(x, y) {

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = "red";
    }
    // Función para animar el proyectil
    function animarProyectil() {
        ctx.beginPath();
        ctx.lineWidth = 4;

        let t = 0;
        let x = origenX;
        let y = origenY;

        const intervaloTiempo = 100; // Intervalo de tiempo para cada actualización (en milisegundos)

        const animate = setInterval(() => {
            if (t <= time) {
                x = origenX + vel * Math.cos(angRad) * t * escala; // Posición horizontal
                y = origenY - ((vel * Math.sin(angRad) * t) - (0.5 * grav * Math.pow(t, 2))) * escala; // Posición vertical

                dibujarProyectil(x, y);

                t += intervaloTiempo / 1000; // Convertir el tiempo a segundos

            } else {
                // La animación ha terminado, mostrar resultados si es necesario
                clearInterval(animate); // Detener la animación
            }
        }, intervaloTiempo);
    }
    // Iniciar la animación
    animarProyectil();

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