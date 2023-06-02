
/**
 * Descripción
 * @method dibujarCuadriculado
 * @return retorna el cuadrado del canvas junto al cuadriculado ya definido
 */
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
        ctx.font = "10px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(ejeX, i, alturaMaxima / 2)
        ctx.closePath();
        ejeX++;
    }

//Lineas Horizontales
    for (let i = paso; i<alturaMaxima; i += paso) {
        ctx.beginPath();
        ctx.moveTo(0, i)
        ctx.lineTo(anchoMax, i);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.font = "10px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(ejeY, anchoMax / 2, i)
        ctx.closePath();
        ejeY++;
    }
}

