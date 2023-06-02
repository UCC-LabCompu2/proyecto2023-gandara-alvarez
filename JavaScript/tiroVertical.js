/**
 * ...
 * @method ...
 * @param {...} ... - ...
 * @param {...} ... - ...
 */

/**
 * ...
 * @method dibujarCuadrado
 * Funcion que se encarga de crear el canvas ya cuadriculado , con sus
 * ejes principales
 */

let calculoFuncion = () => {
    let altura = document.getElementById("altura");
    let velocidad_inicial = document.getElementById("velocidad");
    let gravedad = document.getElementById("gravedad")

    let tiempo = (velocidad_inicial * (-1) )/gravedad
    let calculo_Velocidad_final = velocidad_inicial + (gravedad * tiempo)

    if (velocidad_inicial = 0) {
        let altura_maxima = altura;
    }
    else {
        let altura_maxima = (velocidad_inicial^2)/(2 * gravedad)
    }


}

let dibujarCuadriculado = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const alturaMaxima = canvas.height;
    const anchoMax = canvas.width
    const paso = 20;
    let ejeX = -24;
    let ejeY = -14;


    //Lineas Verticales
    for (let i=paso; i<anchoMax; i+=paso) {
        ctx.beginPath();
        ctx.moveTo(i, 0)
        ctx.lineTo(i, alturaMaxima);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.font="10px Arial";
        ctx.fillStyle="blue";
        ctx.fillText(ejeX, i, alturaMaxima/2)
        ctx.closePath();
        ejeX++;
    }

    //Lineas Horizontales
    for (let i = paso; i<alturaMaxima; i += paso){
        ctx.beginPath();
        ctx.moveTo(0, i)
        ctx.lineTo(anchoMax, i);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.font="10px Arial";
        ctx.fillStyle="blue";
        ctx.fillText(ejeY, anchoMax/2, i)
        ctx.closePath();
        ejeY++;
    }

    //Eje X
    ctx.beginPath();
    ctx.moveTo(0, alturaMaxima/2)
    ctx.lineTo(anchoMax, alturaMaxima/2);
    ctx.strokeStyle = "#6b0a0a";
    ctx.stroke();
    ctx.closePath();

    //EJE Y
    ctx.beginPath();
    ctx.moveTo(anchoMax/2, 0)
    ctx.lineTo(anchoMax/2, alturaMaxima);
    ctx.strokeStyle = "#6b0a0a";
    ctx.stroke();
    ctx.closePath();

}

