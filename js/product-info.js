
var product = {};

//Muestro carousel de imágenes a partir de la posición 2.
//Imagen de posicion 1 se implementó en linea 24 

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
              <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>
        `

        document.getElementById("divCarousel").innerHTML = htmlContentToAppend;
    }

    //Carousel active
    
    let imgActiveHTML = document.getElementById("divActive");

    imgActiveHTML.innerHTML += `<img src="` + array[0] + `" class="d-block w-100" alt="...">`
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok")
            product = resultObj.data;

        //Obtengo datos del json para info detallada de productos y los agrego a html

        let productNameHTML = document.getElementById("productName");
        let productDescriptionHTML = document.getElementById("productDescription");
        let productCountHTML = document.getElementById("productCount");
        let productCategoryHTML = document.getElementById("productCategory");

        productNameHTML.innerHTML = product.name;
        productDescriptionHTML.innerHTML = product.description;
        productCountHTML.innerHTML = product.soldCount;
        productCategoryHTML.innerHTML = product.category;

        //Muestro las imagenes en forma de galería
        showImagesGallery(product.images);


        ;
        //Obtengo datos del json para productos.

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                related = resultObj.data;
                showRelatedProducts(related);
            }

        }
        )

        //Obtengo datos del json para comentarios product_info.

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                infoComments = resultObj.data;

                showInfoComments(infoComments);


            }

        }
        )

    });
})

//Recorro los valores de relatedProduct del json product_info, utilizo la funcion en getJsonData de PRODUCTOS
//para que muestre los productos que esten en la posición obtenida en json de product_info, y los muestro en html.

function showRelatedProducts(array) {
    htmlContentToAppend = "";

    for (i = 0; i < product.relatedProducts.length; i++) {

        let pos = product.relatedProducts[i];
        let related = array[pos];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
        <h6 class="mb-1"><b>` + related.name + `</b></h6>
     <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
        <a href="#">Ver más</a>
     
        </div>
        </div>  `


    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

////Recorro los datos obtenidos en el json (comentarios) y los muestro en html.



function showInfoComments(arrayComments) {


    let htmlContentToAppend = "";

    for (let i = 0; i < arrayComments.length; i++) {

        let comments = arrayComments[i];


        //Muestro el score 

        let scoreHTMl = "";


        for (let i = 0; i < comments.score; i++) {

            scoreHTMl += `<span class="fa fa-star checked"></span>`
        }

        for (let s = comments.score; s < 5; s++) {

            scoreHTMl += `<span class="fa fa-star"></span>`
        }


        htmlContentToAppend += `
        
                <div>
                    
                    <p> <strong> `+ comments.user + `</strong> - ` + comments.dateTime + ` - ` + scoreHTMl + ` <br> ` + comments.description + `  </p>
                    
                    <hr>
                </div>
                
            `




    }
    document.getElementById("infoComments").innerHTML = htmlContentToAppend;
}


// Creo una funcion con una variable a la que le asigno un comentario con la misma estructura que json.
// Inserto en la informacion obtenida en getJsonData con un .push para que se muestre como un comentario más,
// llamando a la función creada anteriormente.


function addComment(l) {

    var comentario = {
        score: l.stars.value,
        description: l.commentForm.value,
        user: sessionStorage.getItem("email"),
        dateTime: fechaYhora
    }
    infoComments.push(comentario);
    showInfoComments(infoComments);
    return false;
}


// Formato de fecha para comentarios

// https://acortar.link/bLK4B

var hoy = new Date();
var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYhora = fecha + '  ' + hora;

