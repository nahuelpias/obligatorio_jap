<!DOCTYPE html>
<!-- saved from url=(0049)https://getbootstrap.com/docs/4.3/examples/album/ -->
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <title>eMercado - Todo lo que busques está aquí</title>

  <link rel="canonical" href="https://getbootstrap.com/docs/4.3/examples/album/">
  <link href="https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,700,700i,900,900i" rel="stylesheet">
  <link href="css/font-awesome.min.css" rel="stylesheet">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
</head>

<body>
  <nav class="site-header sticky-top py-1 bg-dark">
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
      <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
    </div>
  </nav>
  <main role="main" class="pb-5">
    <div class="text-center p-4">
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos del sitio.</p>
    </div>
  <div class="container">
    <div class="row">
        <div class="col text-right">
            <div class="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                <label class="btn btn-light active" id="sortAsc" >
                    <input type="radio" name="options" autocomplete="off" checked>A-Z
                </label>
                <label class="btn btn-light" id="sortDesc" >
                    <input type="radio" name="options" autocomplete="off">Z-A
                </label>
                <label class="btn btn-light" id="sortByCount" >
                    <input type="radio" name="options" autocomplete="off"><i class="fas fa-sort-amount-down mr-1"></i>Cant.
                </label>
            </div>
        </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-md-6"></div>
        <div class="col-md-6 col-sm-12 mb-1 container">
          <div class="row container p-0 m-0">
            <div class="col">
              <p class="font-weight-normal text-right my-2">Cant.</p>
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
            </div>
            <div class="col-3 p-0">
              <div class="btn-group" role="group">
                <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="row">
        <div class="list-group" id="cat-list-container">
        </div>
    </div>
</div>
</main>
  <div id="container p-5">
  </div>
  <footer class="text-muted bg-light">
    <div class="container">
      <p class="float-right">
        <a href="#">Volver arriba</a>
      </p>
      <p>Este sitio forma parte de Desarrollo Web - JAP - 2020</p>
      <p>Clickea <a target="_blank" href="Letra.pdf">aquí</a> para descargar la letra del obligatorio.</p>
    </div>
  </footer>
  <div id="spinner-wrapper">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/init.js"></script>
  <script src="js/products.js"></script>
</body>

</html>
