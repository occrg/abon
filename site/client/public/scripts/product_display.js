let productLayout;

function getProductLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeProductLayout;
  q.open("GET", '/products/get_product_layout', true);
  q.send();
}

function storeProductLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  productLayout = el;
  getProducts();
}

function getProducts() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", '/products/get_products', true);
  q.send();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  products = JSON.parse(this.responseText);
  let ul = document.getElementById("products");

  for (let i = 0; i < products.length; i++) {
    let id = products[i].id;
    let name = products[i].name;
    let price = products[i].price;
    let imageName = products[i].image_name;
    let status = products[i].status;
    let description = products[i].description;

    let productDiv = productLayout.cloneNode(true);

    let nameTag = productDiv.querySelector("div h3");
    let imageTag = productDiv.querySelector("div img");

    nameTag.textContent = name;
    imageTag.src = imageName;

    console.log(imageTag);
    console.log(nameTag);


    productDiv = productDiv.firstElementChild;

    productDiv = overlayEffects(productDiv);

    console.log(productDiv);

    ul.append(productDiv);
  }
}

function overlayEffects(productDiv) {
  let overlay = productDiv.querySelector(".overlay");
  let picture = productDiv.querySelector("img");
  productDiv.addEventListener("mouseenter", function() {
    if (productDiv.classList.contains("animationEnd")) {
      productDiv.classList.add("mouseOn");
      productDiv.classList.remove("mouseOff");
      productDiv.classList.remove("awaitAnimationEndMouseOff");
    }
    else {
      productDiv.classList.add("awaitAnimationEndMouseOn");
    }
    console.log("mouse over");
  });
  productDiv.addEventListener("mouseleave", function() {
    if (productDiv.classList.contains("animationEnd")) {
      productDiv.classList.add("mouseOff");
      productDiv.classList.remove("mouseOn");
      productDiv.classList.remove("awaitAnimationEndMouseOn");
    }
    else {
      productDiv.classList.add("awaitAnimationEndMouseOff");
    }
    console.log("mouse off");
  });
  productDiv.addEventListener("animationstart", function() {
    productDiv.classList.remove("animationEnd");
    console.log("animation start");
  });
  productDiv.addEventListener("animationend", function() {
    productDiv.classList.add("animationEnd");
    if (productDiv.classList.contains("awaitAnimationEndMouseOn")) {
      productDiv.classList.add("mouseOn");
      productDiv.classList.remove("mouseOff");
      productDiv.classList.remove("awaitAnimationEndMouseOn");
    }
    if (productDiv.classList.contains("awaitAnimationEndMouseOff")) {
      productDiv.classList.add("mouseOff");
      productDiv.classList.remove("mouseOn");
      productDiv.classList.remove("awaitAnimationEndMouseff");
    }
    console.log("animation end");
  });
  return productDiv;
}
