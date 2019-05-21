addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getProductLayout();
}

var productLayout;
var productDescription;

function getProductLayout() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = storeProductLayout;
  q.open("GET", '/products/get_product_layout', true);
  q.send();
}

function getProductDescription(){
    var q = new XMLHttpRequest();
    q.onreadystatechange = storeProductDescription;
    q.open("GET", '/products/get_product_description', true);
    q.send();
}

function storeProductLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var el = document.createElement('html');
  el.innerHTML = this.responseText;
  productLayout = el;
  getProductDescription();
  getProducts();
}

function storeProductDescription() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var el = document.createElement('html');
  el.innerHTML = this.responseText;
  productDescription = el;
}

function getProducts() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", '/products/get_products', true);
  q.send();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  products = JSON.parse(this.responseText);
  let ul = document.querySelector("#product-list");

  for (var i = 0; i < products.length; i++) {
      let product = productLayout.cloneNode(true);
      let productDescr = productDescription.cloneNode(true);
      
      let buttonDiv = product.getElementsByClassName('mask proudct-content')[0]; //product spelt wrong here
      let name = product.getElementsByTagName('h1')[0];
      let image = product.getElementsByClassName('product-image')[0];
      let infoButton = product.getElementsByClassName('mt-1 btn btn-lg abon-bg-orange')[0];
      let addToBasketButton = document.createElement("button");
      
      let nameModal = productDescr.getElementsByClassName('modal-title')[0];
      let descriptionModal = productDescr.getElementsByClassName('product-description')[0];
      let priceModal = productDescr.getElementsByClassName('product-price')[0];
      let mainDiv = productDescr.getElementsByClassName('modal fade')[0];

      // 2 == AVAILABLE
      // 1 == SOLD OUT
      // 0 == COMING SOON
      
      let productId = products[i].id;
      let productName = products[i].name;
      let productPrice = products[i].price;
      let productStatus = products[i].status;
      let productDescrt = products[i].description;
      
      if(productStatus == 2){
          name.textContent = products[i].name;
          
          addToBasketButton.innerHTML = 'Add to Basket <i class="fa fa-shopping-basket"></i>';
          addToBasketButton.className = "mt-1 btn btn-lg abon-bg-orange";
          addToBasketButton.addEventListener("click", function() {
            var myCart = document.getElementById("cart");
            addToBasket(myCart, productId, productName, productPrice);
          });
          buttonDiv.append(addToBasketButton);
      }else if(productStatus == 1){
          name.textContent = 'Sold Out';
      }else if(productStatus == 0){
          name.textContent = 'Coming Soon';
      }

      image.src = products[i].image_name;
      infoButton.dataset.target = '#productId' + products[i].id;
      
      nameModal.textContent = products[i].name + ' Info';
      descriptionModal.textContent = products[i].description;
      mainDiv.id = 'productId' + products[i].id;
      priceModal.textContent = 'Price: £' + products[i].price.toFixed(2) + ' (Each sachet serves one person)';

      product = product.firstElementChild;
      productDescr = productDescr.firstElementChild;
      ul.appendChild(product);
      ul.append(productDescr);
  }
}

function addToBasket(myCart, productId, productName, productPrice) {

  var rowId = "row-id-" + productId.toString();
  var meal = myCart.getElementsByClassName(rowId)[0];

  if(meal == null) {
    let el = document.createElement('html');

    rowText = '<tr class="' + rowId + '"><td class="pt-3-half">' + productName + '</td><td class="pt-3-half price">'+ productPrice.toFixed(2) +'</td><td class="pt-3-half meal-quantity" contenteditable="false"><div class="container"><div class="row justify-content-center"><div class="col-xs-3 col-xs-offset-3"><div class="input-group number-spinner"><span class="input-group-btn"><button style="min-width: 2.5rem" data-dir="dwn" class="bg-light btn btn-decrement btn-outline-secondary" type="button"><strong>-</strong></button></span><input type="text" style="max-width: 3.0rem" class="form-control text-center" value="1" readonly="true"/><span class="input-group-btn"><button style="min-width: 2.5rem" data-dir="up" class="bg-light btn btn-increment btn-outline-secondary" type="button"><strong>+</strong></button></span></div></div></div></div></td><td><button type="button" class="btn btn-danger btn-rounded removeBtn btn-sm my-0">Remove</button></td></tr>';

    el.innerHTML = rowText;
    rowHTML = el.firstElementChild;
    myCart.append(rowHTML);

    meal = myCart.getElementsByClassName(rowId)[0];

    meal.getElementsByClassName("removeBtn")[0].addEventListener("click", function(){
        this.parentElement.parentElement.remove();
    });
  }
  else {
    var mealQuantity = meal.getElementsByClassName('form-control text-center')[0];
    mealQuantity.value = parseInt(mealQuantity.value) + 1;
  }
    
    subtotal();
}

function subtotal(){
    var myCart = document.getElementById("cart");
    var tableRows = myCart.children;
    var sum = 0;

    for(i = 1; i < tableRows.length; i++){
        var price = parseFloat(tableRows[i].getElementsByClassName("pt-3-half price")[0].innerHTML);
        var quantity = parseFloat(tableRows[i].getElementsByTagName("input")[0].value);
        sum += price * quantity;
    }
    sum = sum.toFixed(2);
    document.getElementById("total").innerHTML = sum;
    console.log(sum);
}

function getHeader() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let header = document.getElementsByTagName("header")[0];
  header.innerHTML = this.responseText;
  pageHeading = header.getElementsByClassName("productsHeader")[0];
  pageHeading.className = "abon-yellow"
}

function getFooter() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = this.responseText;
}
