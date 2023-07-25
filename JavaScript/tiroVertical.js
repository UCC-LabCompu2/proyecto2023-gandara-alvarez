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
    let altura,altura2, vel, vel2, grav, grav2;
    altura = document.getElementById("altura").value;
    altura2 = document.getElementById("altura");
    vel = document.getElementById("velocidad").value;
    vel2 = document.getElementById("velocidad");
    grav = document.getElementById("gravedad").value;
    grav2 = document.getElementById("gravedad");
     if (id === "velocidad"){
        document.getElementById("velocidad").value = valor;
        if (vel<0 || vel>50 || isNaN(vel)){
            alert("Velocidad mal ingresado, vuelva a ingresar");
            vel2.value = '';
        }
    }else if (id ==="gravedad"){
        document.getElementById("gravedad").value = valor;
        if (grav<1 || grav>20 || isNaN(grav) ){
            alert("Gravedad mal ingresado, vuelva a ingresar");
            grav2.value = '';
        }
    }else if (id==="altura"){
        document.getElementById("altura").value = valor;
        if (altura<0 || altura>10 || isNaN(altura) ){
            alert("Altura mal ingresado, vuelva a ingresar");
            altura2.value = '';
        }
    }
}

/**
 * Se encarga de graficar en el canvas el tiro vertical calculando la altura maxima de vuelo y el tiempo que transcurre
 * para que llegue desde la altura incial a la altura maxima
 * @method graficarTiroVertical
 */
function graficarTiroVertical() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Obtener los valores de los parámetros ingresados por el usuario
    const fuerza = Number(document.getElementById("velocidad").value);
    const alturaInicial = Number(document.getElementById("altura").value);
    const gravedad = Number(document.getElementById("gravedad").value);

    // Constantes
    const escala = 10; // Factor de escala para la posición horizontal
    const intervaloMarcas = 50; // Factor de escala para la posición vertical

    // Cálculos
    const velocidadInicial = Math.sqrt((2 * fuerza) / gravedad); // Calcular la velocidad inicial
    const tiempoTotal = (2 * velocidadInicial * Math.sin(Math.PI / 2)) / gravedad; // Tiempo total de vuelo
    const alturaMaxima = (Math.pow(velocidadInicial, 2) / (2 * gravedad)) + alturaInicial; // Altura máxima alcanzada

    // Configuración del lienzo
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    // Dibujar ejes
    const origenX = 0; // Comienzo del eje x en el extremo izquierdo inferior
    const origenY = canvasHeight; // Comienzo del eje y en el extremo izquierdo inferior
    const finEjeX = canvasWidth;
    const finEjeY = 0;
    ctx.stroke();

    // Dibujar el eje x con marcas y etiquetas
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

    // Dibujar el eje y con marcas y etiquetas
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

    // Dibujar trayectoria
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.moveTo(origenX, origenY - alturaInicial * escala);

    let t = 0;
    let x = origenX;
    let y = origenY - alturaInicial * escala;

    while (x <= canvasWidth && y >= 0) {
        x = origenX + t * escala; // Posición horizontal
        y = origenY - ((velocidadInicial * t * Math.sin(Math.PI / 2)) - 0.5 * gravedad * Math.pow(t, 2) + alturaInicial) * escala; // Posición vertical

        ctx.lineTo(x, y);

        t += 0.1;
    }

    ctx.stroke();
    mostrarResultados(alturaMaxima, tiempoTotal);
}

/**
 * Se encarga de asignarle los valores calculados en la funcion graficarTiroVertical() al recuadro de los resultados
 * @method mostrarResultados
 * @param {number} alturaMaxima - altura maxima calculada en la funcion graficarTiroVertical()
 * @param {number} tiempo - tiempo que transcurre entre la altura inicial y la altura maxima alcanzada, tiempo total de vuelo
 */
function mostrarResultados(alturaMaxima, tiempo) {
    let formulario = document.getElementById("unity");
    if (alturaMaxima < 0 || tiempo < 0) {
        alert("Con los datos que usted ingreso,los resultados dan valores improbables, por favor cambie los datos");
        formulario.reset()
    }else{
        document.getElementById("distancia").textContent = alturaMaxima.toFixed(2);
        document.getElementById("tiempo").textContent = tiempo.toFixed(2);
    }
}


