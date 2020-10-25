valorPorcentaje = 0.15;
PESO_SYMBOL = 'UYU';
sumaSubtotales = 0;

document.addEventListener("DOMContentLoaded", function (e) {


    //OBTENGO DATOS DE ARTICULOS EN JSON

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok")
            articulo = resultObj.data
        showArticles();
        updateCosto();
    });

    //RECORRO Y MUESTRO ARTICULOS

    function showArticles() {

        for (i = 0; i < articulo.articles.length; i++) {

            //INSERTO ID
            articulo.articles[i].id = "id" + i;
            productRow = "product_row_" + i;
            idSubtotal = "subtotalPrimero" + [i];
            articleHTML = document.getElementById("articlesTable");

            articleHTML.innerHTML +=
                `<div class"container">
            <div class"row">
            
            <tr id="`+productRow+`">
        <td> <img src="`+ articulo.articles[i].src + `"class="col-4"></td>
        <td>`+ articulo.articles[i].name + `</td>
        <td>`+ articulo.articles[i].currency + ` ` + articulo.articles[i].unitCost + `</td>   
        <td><input id="cantidad_`+ articulo.articles[i].id + `"class="rounded text-center" type="number" min="0" style="width:60px " value="` + articulo.articles[i].count + `" onchange="updateCosto()"></input></td>
        <td  id="`+ idSubtotal + `"> </td>
        <td><button class="btn btn-danger"  onclick="removeItems()">ELIMINAR</button></td>
        
            </tr>
            
            </div>
            </div>`
        }
    }
})

//ACTUALIZAR COSTOS

function updateCosto() {

    for (i = 0; i < articulo.articles.length; i++) {

        articulo.articles[i].id = "id" + i;

        idSubtotal = "subtotalPrimero" + [i];


        //CONVERSION DE MONEDA
        var pesos = 40;
        if (articulo.articles[i].currency == 'USD') {
            unitCost = parseInt(articulo.articles[i].unitCost * pesos)
        } else {
            unitCost = parseInt(articulo.articles[i].unitCost)
        }

        //OBTENGO VALOR DEL INPUT CANTIDAD
        cantidad = document.getElementById(`cantidad_` + articulo.articles[i].id).value;


        //SUBTOTAL PRIMERO
        sub = cantidad * unitCost;

        document.getElementById(idSubtotal).innerHTML = `<b>` + PESO_SYMBOL + ` ` + sub + `<b>`;

        //SUMO SUBTOTALES
        sumaSubtotales += sub;

        document.getElementById("subtotalSegundo").innerHTML = `<span class="text-muted"><b>` + PESO_SYMBOL + ` ` + sumaSubtotales + `<b></span>`

        //CALCULO COSTO DE ENVIO E INSERTO EN HTML
        calcEnvio = sumaSubtotales * valorPorcentaje;
        document.getElementById("costoEnvio").innerHTML = `<span class="text-muted"><b>` + PESO_SYMBOL + ` ` + parseInt(calcEnvio) + `<b></span>`;

        //CALCULO TOTAL ENVIO E INSERTO EN HTML
        totalCostJS = sumaSubtotales + calcEnvio;
        document.getElementById("totalCostHTML").innerHTML = `<span class="text-muted"><b>` + PESO_SYMBOL + ` ` + totalCostJS + `<b></span>`;

    }
    //INSERTO TOTAL EN CARD
    document.getElementById("totalPayCard").innerHTML = totalCostJS;

    sumaSubtotales = 0;
}


//COSTO DE ENVIO EVENT
document.getElementById("envioPremium").addEventListener("change", function () {
    valorPorcentaje = 0.15;
    updateCosto();

});

document.getElementById("envioExpress").addEventListener("change", function () {
    valorPorcentaje = 0.07;
    updateCosto();
});

document.getElementById("envioStandard").addEventListener("change", function () {
    valorPorcentaje = 0.05;
    updateCosto();
});


//ELIMINAR ITEMS DEL CARRITO
function removeItems() {
    document.getElementById("articlesTable").deleteRow(productRow);
}

//OBTENGO MENSAJE DE CONFIRMACION COMPRA
getJSONData(CART_BUY_URL).then(function (resultObj) {
    if (resultObj.status === "ok")
        msjCompra = resultObj.data

});




//MUESTRO LA FORMA DE PAGO QUE SE ELIGIÓ
function clickPago1() {

    var formaPago1 = document.getElementById("optionCredito").textContent;
    document.getElementById("formaDePagoHTML").innerHTML = `<p><b>` + formaPago1 + `</b></p>`;

}

function clickPago2() {

    var formaPago2 = document.getElementById("optionR").textContent;
    document.getElementById("formaDePagoHTML").innerHTML = `<p><b>` + formaPago2 + `</b></p>`;

}




//VALIDO LOS CAMPOS A LLENAR, SI ESTAN VACIOS MUESTRO MENSAJE
//https://www.youtube.com/watch?v=j3ixg2cPI54&ab_channel=CodigoMentor

var formaPagoHTML = document.getElementById("formaDePagoHTML");
var calleForm = document.getElementById("calle");
var numeroForm = document.getElementById("numeroPuerta");
var esquinaForm = document.getElementById("esquina");
var error = document.getElementById("error");
var modalContent = document.getElementById("modalContentHTML");
error.style.color = 'red';

function validation() {


    var mensajeError = [];

    if (calleForm.value === null || calleForm.value === '') {
        mensajeError.push('Ingresa tu calle.')
    }
    
    if (numeroForm.value === null || numeroForm.value === '') {
        mensajeError.push('Ingresa tu numero de puerta.')
    }

    if (esquinaForm.value === null || esquinaForm.value === '') {
        mensajeError.push('Ingresa tu esquina.')
    }

    else if (formaPagoHTML.textContent === null || formaPagoHTML.textContent === '') {
        mensajeError.push('Elige tu opción de pago.')
    }
    

    else {
        modalContent.innerHTML =
            `<div class="alert h5 alert-success" role="alert">
        <img src="img/check.png" height="100">
        `+ msjCompra.msg + `
      </div>`
    }
    error.innerHTML = mensajeError.join('<br>');


    return false;


}
