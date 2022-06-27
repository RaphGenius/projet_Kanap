// Recuperer l'id de l'URL
let url_str = window.location;
let url = new URL(url_str);
let search_params = url.searchParams;
let productId = search_params.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  // Creer un produit pour l'éléments produits
  .then(function (product) {
    canapPresentation(product);
    // Creer une option pour chaques couleurs
    for (const color of product.colors) {
      colorChoice(color);
    }
  })
  .catch(function (err) {
    window.alert(`Pas de contact avec l'api.${err}`);
  });

function canapPresentation(product) {
  // photo
  let pictPresentation = document.createElement("img");
  document.querySelector(".item__img").appendChild(pictPresentation);
  pictPresentation.setAttribute("alt", product.altTxt);
  pictPresentation.src = product.imageUrl;

  // Titre
  document.getElementById("title").innerText = `${product.name}`;

  // Prix
  document.getElementById("price").innerText = `${product.price}`;

  // description
  document.getElementById("description").innerText = `${product.description}`;
}

// Creer une option pour couleur
function colorChoice(color) {
  let colorOpt = document.createElement("option");
  colorOpt.setAttribute("value", `${color}`);
  colorOpt.innerText = `${color}`;
  document.getElementById("colors").appendChild(colorOpt);
}

// Stocker les valeurs dans le localStorage
///////////////////////////////////////////////

// Recuperer le panier
function getBasket() {
  if (localStorage.getItem("produits")) {
    return JSON.parse(localStorage.getItem("produits"));
  } else {
    return [];
  }
}

// Ajout un produit/quantité/coleur à l'objet
function addBasket(produit) {
  let panier = getBasket(produit);
  let colorCanap = document.getElementById("colors").value;
  let quantityCanap = document.getElementById("quantity").value;
  // Evalue si un produit d'une même couleur se trouve dans le localStorage
  let match = panier.find((element) => {
    if (productId == element.idCanap && colorCanap == element.colorCanap) {
      return element;
    }
  });
  if (match) {
    //Transformer les chaines de caractères en nombre
    match.quantityCanap = parseInt(match.quantityCanap);
    quantityCanap = parseInt(quantityCanap);
    // Aditionne la quantité choisie avec la quantité du localStorage
    match.quantityCanap += quantityCanap;
    console.log(`match quantité = ${match.quantityCanap}`);
  } else {
    panier.push(produit);
    quantityCanap = parseInt(quantityCanap);
  }
  return panier;
}

// Envoie le panier dans le local storage
function saveBasket(panier) {
  localStorage.setItem("produits", JSON.stringify(panier));
}

// Event au click -
document.getElementById("addToCart").addEventListener("click", () => {
  let colorCanap = document.getElementById("colors").value;
  let quantityCanap = document.getElementById("quantity").value;
  // Si la quantité est incorrecte
  if (quantityCanap < 1 || quantityCanap > 100) {
    window.alert("La quantité selectionnée est incorrecte");
    return;
  }
  // Si aucune couleur n'est selectionnée
  if (!colorCanap) {
    // Si colorCanap est falsy
    window.alert("Veuillez selectionner une couleur");
    return;
  }

  let produitPanier = {
    idCanap: productId,
    colorCanap, // = colorCanap : colorCanap peut être écrit seul
    quantityCanap,
  };
  const panier = addBasket(produitPanier);
  saveBasket(panier);
});
