valorPorcentaje = 0.15;
PESO_SYMBOL = 'UYU'

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

            idSubtotal = "subtotalPrimero" + [i];
            articleHTML = document.getElementById("articlesTable");

            articleHTML.innerHTML +=
                `<div class"container">
            <div class"row">
            <tr>
        <td> <img src="`+ articulo.articles[i].src + `"class="col-4"></td>
        <td>`+ articulo.articles[i].name + `</td>
        <td>`+ articulo.articles[i].currency + ` ` + articulo.articles[i].unitCost + `</td>   
        <td><input id="`+ articulo.articles[i].id + `" class="rounded" type="number" min="1" style="width:60px" value="` + articulo.articles[i].count + `" onchange="updateCosto()"></input></td>
        <td id="`+ idSubtotal + `"></td>
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
        cantidad = document.getElementById(articulo.articles[i].id).value;

        //SUBTOTAL PRIMERO
        sub = cantidad * unitCost;

        document.getElementById(idSubtotal).innerHTML = `<b>` + PESO_SYMBOL + ` ` + sub + `<b>`;

        //INPUT SUBTOTAL SEGUNDO
        document.getElementById("subtotalSegundo").innerHTML = `<span class="text-muted"><b>` + PESO_SYMBOL + ` ` + sub + `<b></span>`


        //CALCULO COSTO DE ENVIO E INSERTO EN HTML
        calcEnvio = sub * valorPorcentaje;
        document.getElementById("costoEnvio").innerHTML = `<span class="text-muted"><b>` + PESO_SYMBOL + ` ` + parseInt(calcEnvio) + `<b></span>`;

        //CALCULO TOTAL ENVIO E INSERTO EN HTML
        totalCostJS = sub + calcEnvio;
        document.getElementById("totalCostHTML").innerHTML = `<span class="text-muted"><b>` + PESO_SYMBOL + ` ` + totalCostJS + `<b></span>`;

    }
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


document.getElementById("totalCostHTML").addEventListener("change", function () {
    updateCosto();
})



//OBTENGO MENSAJE DE CONFIRMACION COMPRA

getJSONData(CART_BUY_URL).then(function (resultObj) {
    if (resultObj.status === "ok")
        msjCompra = resultObj.data


    let modalContent = document.getElementById("modalContentHTML");

    modalContent.innerHTML =
        `<div class="alert h5 alert-success" role="alert">
        <img src="img/check.png" height="100">
        `+ msjCompra.msg + `
      </div>`
});














