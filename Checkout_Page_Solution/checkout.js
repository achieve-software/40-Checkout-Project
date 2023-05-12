const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  // show chart totals on window load!
  calculateCartPrice();
});
const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (e) => {
  //- TIKLANDIĞINDA
  if (e.target.className === "fa-solid fa-minus") {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      calculateProductPrice(e.target);
    } else {
      if (
        confirm(
          `${
            e.target.closest(".product-info").querySelector("h2").innerText
          } will be removed!`
        )
      ) {
        e.target.closest(".product").remove();
      }
    }
    calculateCartPrice();
  }

  //+ TIKLANDIĞINDA
  else if (e.target.classList.contains("fa-plus")) {
    e.target.parentElement.querySelector(".quantity").innerText++;
    calculateProductPrice(e.target);
    calculateCartPrice();
  }

  //REMOVE TIKLANDIĞINDA
  else if (e.target.getAttribute("class") == "remove-product") {
    if (
      confirm(
        `${
          e.target.closest(".product-info").querySelector("h2").innerText
        } will be removed!`
      )
    ) {
      e.target.closest(".product").remove();
    }
    calculateCartPrice();
  }
  //DİĞER YERLER TIKLANDIĞINDA
  else {
    alert("other element clicked");
  }
});

const calculateProductPrice = (target) => {
  //each product total calculation
  //productTotalPrice => quantity * price
  const productInfoDiv = target.closest(".product-info");
  console.log(productInfoDiv);
  //unit price
  //div.class vs. .class as performance
  const price = productInfoDiv.querySelector(
    "div.product-price strong"
  ).innerText;
  //quantity
  const quantity = productInfoDiv.querySelector("p.quantity").innerText;
  productInfoDiv.querySelector("div.product-line-price").innerText = (
    price * quantity
  ).toFixed(2);
};

const calculateCartPrice = () => {
  //cart total calculation from all products
  //NodeList
  const productLinePriceDivs = document.querySelectorAll(".product-line-price");
  // const productLinePriceDivs = document.getElementsByClassName("product-line-price");

  //reduce vs. foreach !!!!! homework!!
  let subtotal = 0;
  //forEach => array + nodeList
  productLinePriceDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });
  console.log(subtotal);

  const taxPrice = subtotal * localStorage.getItem("taxRate");
  console.log(taxPrice);

  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  const totalPrice = subtotal + taxPrice + shippingPrice;

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);
  document.getElementById("cart-tax").children[1].innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shippingPrice.toFixed(2);
  document.querySelector("#cart-total p:last-child").innerText =
    totalPrice.toFixed(2);
};
