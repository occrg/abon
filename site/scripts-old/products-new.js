addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getProductsLayout();
  getProducts();
}

var productLayout;

function getProductsLayout() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = storeProductsLayout;
  q.open("GET", '/products/get_products_layout', true);
  q.send();
}

function storeProductsLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var el = document.createElement('html');
  el.innerHTML = this.responseText;
  productLayout = el;
}

function getProducts() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", '/products/get_products', true);
  q.send();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  let products = JSON.parse(this.responseText);
  console.log(products);
  let ul = document.querySelector("#product-list");
  for (var i = 0; i < products.length; i++) {
      let productId = products[i].id;
      let productName = products[i].name;
      let productPrice = products[i].price;
      let product = productLayout.cloneNode(true);
      let name = product.getElementsByTagName('h1')[0];
      let image = product.getElementsByClassName('product-image')[0];
      let buttonDiv = product.getElementsByClassName('carousel-caption mask proudct-content')[0];
      name.textContent = products[i].name;
      image.src = products[i].image_name;
      
      let addToBasketButton = document.createElement("button");
      addToBasketButton.innerHTML = "Add to Basket";
      addToBasketButton.className = "mt-1 btn btn-sm btn-info";
      addToBasketButton.addEventListener("click", function(){
            var myCart = document.getElementById("cart");   
            addToBasket(myCart, productId, productName, productPrice);
      });
      buttonDiv.append(addToBasketButton);
      
      product = product.firstElementChild;
      ul.appendChild(product);
  }
}

function addToBasket(myCart, productId, productName, productPrice) { 
        
        var rowId = "row-id-" + productId.toString();
        var meal = myCart.getElementsByClassName(rowId)[0];    
        
        if(meal == null) {
            let el = document.createElement('html');
//            rowText = '<tr class="' + rowId + '"><td class="pt-3-half">' + productName + '</td><td class="pt-3-half">2.20</td><td class="pt-3-half meal-quantity" contenteditable="false">1</td><td><button type="button" class="btn btn-danger btn-rounded removeBtn btn-sm my-0">Remove</button></td></tr>';
            
            
            rowText = '<tr class="' + rowId + '"><td class="pt-3-half">' + productName + '</td><td class="pt-3-half">2.20</td><td class="pt-3-half meal-quantity" contenteditable="false"><div class="container"><div class="row justify-content-center"><div class="col-xs-3 col-xs-offset-3"><div class="input-group number-spinner"><span class="input-group-btn"><button style="min-width: 2.5rem" data-dir="dwn" class="bg-light btn btn-decrement btn-outline-secondary" type="button"><strong>-</strong></button></span><input type="text" style="max-width: 3.0rem" class="form-control text-center" value="0"/><span class="input-group-btn"><button style="min-width: 2.5rem" data-dir="up" class="bg-light btn btn-increment btn-outline-secondary" type="button"><strong>+</strong></button></span></div></div></div></div></td><td><button type="button" class="btn btn-danger btn-rounded removeBtn btn-sm my-0">Remove</button></td></tr>';
            
            
            el.innerHTML = rowText;
            rowHTML = el.firstElementChild;
            myCart.append(rowHTML);
                        
            meal = myCart.getElementsByClassName(rowId)[0];
            
            //remove button removes row
            meal.getElementsByClassName("removeBtn")[0].addEventListener("click", function(){
                this.parentElement.parentElement.remove();
            });
        }
    else {
            var mealQuantity = meal.getElementsByClassName('form-control text-center')[0];
            console.log(typeof mealQuantity.value);
            mealQuantity.value = parseInt(mealQuantity.value) + 1;
        }
}

function getHeader() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var header = document.querySelector("#header");
  let headerText = this.responseText;
  let headerTextSplit = headerText.split("$PRODUCTSCLASS$");
  headerText = headerTextSplit.join(" class=\"abon-yellow\"")
  headerText = headerText.replace(/\$\w*\$/g, "");
  header.innerHTML = headerText;
}

function getFooter() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var footer = document.querySelector("#footer");
  footer.innerHTML = this.responseText;
}