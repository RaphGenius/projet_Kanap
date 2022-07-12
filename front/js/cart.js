let panier = JSON.parse(localStorage.getItem("produits"));
let totalCanapQuantity = 0;
let totalCanapPrice = 0;

if (panier) {
  for (let i = 0; i < panier.length; i++) {
    const produitLs = panier[i];
    let produitComplet;
    fetch("http://localhost:3000/api/products/" + produitLs.idCanap)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((item) => {
        produitComplet = { ...produitLs, ...item };
        resumePanier(produitComplet);
        quantityTotal(produitComplet);
        priceTotal(produitComplet);
        if (i === panier.length - 1) {
          removeQuantity();
          quantityChange();
          testFormulaire();
          getIdProducts();
        }
      })

      .catch(function (err) {
        window.alert(`Pas de contact avec l'api.${err}`);
      });
  }
}
// Envoie les informations clients + produits
// Envoie vers la page confirmation avec l'orderId dans l'url
function post() {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }) // Envoi à la page confirmation
    .then(function (response) {
      window.location.href = `../html/confirmation.html?orderId=${response.orderId}`;
    })
    .catch(function (err) {
      window.alert(`Pas de contact avec l'api.${err}`);
    });
}
// Récupère les id présents dans les data id des produits dans le panier
let products = [];
function getIdProducts() {
  let quantityChange = document.querySelectorAll("input.itemQuantity");
  for (let i = 0; i < quantityChange.length; i++) {
    const article = quantityChange[i].closest("article");
    let idProduit = article.dataset.id;
    products.push(idProduit);
  }
}

// total des quantités de produit
function quantityTotal(produitComplet) {
  let showQuantity = document.getElementById("totalQuantity");
  totalCanapQuantity += parseInt(produitComplet.quantityCanap);
  showQuantity.textContent = totalCanapQuantity;
}
// Prix total des produits
function priceTotal(produitComplet) {
  let showPrice = document.getElementById("totalPrice");
  totalCanapPrice += produitComplet.price * produitComplet.quantityCanap;
  showPrice.textContent = totalCanapPrice;
}

// Création résume du panier
function resumePanier(produitComplet) {
  let section = document.getElementById("cart__items");

  //article
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", `${produitComplet.idCanap}`); // CHANGER VALEUR !!
  article.setAttribute("data-color", `${produitComplet.colorCanap}`); // CHANGER VALEUR !!

  // Image
  let divImage = document.createElement("div");
  let imgCanap = document.createElement("img");
  divImage.classList.add("cart__item__img");
  imgCanap.setAttribute("src", produitComplet.imageUrl); // CHANGER VALEUR !!
  imgCanap.setAttribute("alt", "Photographie d'un canapé");

  // Description
  let itemContent = document.createElement("div");
  itemContent.classList.add("cart__item__content");
  let itemDescription = document.createElement("div");
  itemDescription.classList.add("cart__item__content__description");

  // Choix quantité
  let itemSettings = document.createElement("div");
  itemSettings.classList.add("cart__item__content__settings");
  let itemQuantity = document.createElement("div");
  itemQuantity.classList.add("cart__item__content__settings__quantity");
  let showQuantity = document.createElement("p");
  let changeQuantity = document.createElement("input");
  changeQuantity.setAttribute("type", "number");
  changeQuantity.setAttribute("name", "itemQuantity");
  changeQuantity.setAttribute("min", "1");
  changeQuantity.setAttribute("max", "100");
  changeQuantity.setAttribute("value", produitComplet.quantityCanap);
  changeQuantity.classList.add("itemQuantity");

  // Suppression élément
  let itemDelete = document.createElement("div");
  itemDelete.classList.add("cart__item__content__settings__delete");
  let buttonDelete = document.createElement("p");
  buttonDelete.classList.add("deleteItem");
  buttonDelete.textContent = `Supprimer`;

  // Ajout des éléments
  section.appendChild(article);
  article.appendChild(divImage);
  divImage.appendChild(imgCanap);
  article.appendChild(itemContent);
  itemContent.appendChild(itemDescription);
  itemDescription.innerHTML = `<h2>${produitComplet.name}</h2> 
    <p>${produitComplet.colorCanap}</p>
    <p>${produitComplet.price}€</p>`; // CHANGER VALEUR !! // CHANGER VALEUR !!
  itemContent.appendChild(itemSettings);
  itemSettings.appendChild(itemQuantity);
  itemQuantity.appendChild(showQuantity);
  showQuantity.textContent = `Qté :`;
  itemQuantity.appendChild(changeQuantity);
  itemSettings.appendChild(itemDelete);
  itemDelete.appendChild(buttonDelete);
}

// Change la quantité des produits, les modifications se font sur le html et dans le localStorage
function quantityChange() {
  let quantityChange = document.querySelectorAll("input.itemQuantity");
  for (let i = 0; i < quantityChange.length; i++) {
    quantityChange[i].addEventListener("change", (e) => {
      if (e.target.value < 1 || e.target.value > 100) {
        window.alert("La quantité selectionnée est incorrecte");
        return;
      }
      const article = quantityChange[i].closest("article");
      const idArticle = article.dataset.id;
      const idColor = article.dataset.color;
      const newQuantity = panier.find((element) => {
        if (idArticle === element.idCanap && idColor === element.colorCanap) {
          return element;
        }
      });
      newQuantity.quantityCanap = parseInt(e.target.value);
      localStorage.setItem("produits", JSON.stringify(panier));
      location.reload();
    });
  }
}
// Permet de supprimer un produit
function removeQuantity() {
  let btnRemove = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < btnRemove.length; i++) {
    btnRemove[i].addEventListener("click", () => {
      const article = btnRemove[i].closest("article");
      const idArticle = article.dataset.id;
      const idColor = article.dataset.color;
      const newPanier = panier.filter((element) => {
        if (idArticle !== element.idCanap || idColor !== element.colorCanap) {
          return element;
        }
      });
      localStorage.setItem("produits", JSON.stringify(newPanier));
      window.location.reload();
    });
  }
}
//Event formulaire, récupère les info du form et les envoies si le form est valide
document.querySelector(".cart__order__form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (testFormulaire()) {
    formInfo();
    post();
  }
});

// Fonction qui renvoie envoie les informations du formulaire
let contact = {};
function formInfo() {
  let prenom = document.getElementById("firstName");
  let nom = document.getElementById("lastName");
  let adresse = document.getElementById("address");
  let ville = document.getElementById("firstName");
  let email = document.getElementById("email");
  contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: email.value,
  };
  return contact;
}
// Variables qui sont dans un tableau, seront true si la condition est remplie (champ du formulaire valide)
let bollPrenom = false;
let bollNom = false;
let bollAdresse = false;
let bollVille = false;
let bollMail = false;

// Teste tous les champs du formulaire, renvoie true si les infos respectent les regles des RegEx, renvoie false si un champ est inccorecte.
function testFormulaire() {
  let nameRegEx = new RegExp(`^[A-Za-z-\é\ê\è\ë\s\']+$`);
  let emailRegEx = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`, "g");
  let adressRegEx = new RegExp(`^[a-zA-Z0-9\s\,\''\-\é\è\ï\ê\ë\ê ]*$`);
  testMail(emailRegEx);
  testPrenom(nameRegEx);
  testNom(nameRegEx);
  testAdresse(adressRegEx);
  testCity(nameRegEx);
  let bollValidation = [bollPrenom, bollNom, bollAdresse, bollVille, bollMail];
  // Si un false se trouve dans le tableau, renvoie false et le formulaire ne peut pas s'envoyer
  if (bollValidation.includes(false)) {
    return false;
  } else {
    return true;
  }
}
// Test la validité de l'adresse mail
function testMail(emailRegEx) {
  let mailUser = document.getElementById("email");
  let validatorMailMsg = document.getElementById("emailErrorMsg");
  mailUser.addEventListener("change", () => {
    let testMail = emailRegEx.test(email.value);
    if (testMail) {
      validatorMailMsg.innerHTML = "Email Valide";
      bollMail = true;
    } else {
      validatorMailMsg.innerHTML = "Email non valide";
      bollMail = false;
    }
  });
}
// Test la validité du prénom
function testPrenom(nameRegEx) {
  let prenomUser = document.getElementById("firstName");
  let validatorPrenomMsg = document.getElementById("firstNameErrorMsg");
  prenomUser.addEventListener("change", () => {
    let testPrenom = nameRegEx.test(prenomUser.value);
    if (!testPrenom) {
      validatorPrenomMsg.textContent = "Prenom non valide";
      bollPrenom = false;
    } else {
      validatorPrenomMsg.textContent = "Prenom valide";
      bollPrenom = true;
    }
  });
}
// Test la validité du nom
function testNom(nameRegEx) {
  let nomUser = document.getElementById("lastName");
  let validatorNomMsg = document.getElementById("lastNameErrorMsg");
  nomUser.addEventListener("change", () => {
    let testNom = nameRegEx.test(nomUser.value);
    if (!testNom) {
      validatorNomMsg.textContent = "nom non valide";
      bollNom = false;
    } else {
      validatorNomMsg.textContent = "nom valide";
      bollNom = true;
    }
  });
}
// Test la validité de l'adresse'
function testAdresse(adressRegEx) {
  let adresseUser = document.getElementById("address");
  let validatorAdresseMsg = document.getElementById("addressErrorMsg");
  adresseUser.addEventListener("change", () => {
    let testAdresse = adressRegEx.test(adresseUser.value);
    if (!testAdresse) {
      validatorAdresseMsg.textContent = "adresse non valide";
      bollAdresse = false;
    } else {
      validatorAdresseMsg.textContent = "adresse valide";
      bollAdresse = true;
    }
  });
}
// Test la validité de la ville
function testCity(nameRegEx) {
  let villeUser = document.getElementById("city");
  let validatorVilleMsg = document.getElementById("cityErrorMsg");
  villeUser.addEventListener("change", () => {
    let testVille = nameRegEx.test(villeUser.value);
    if (!testVille) {
      validatorVilleMsg.textContent = "Ville non valide";
      bollVille = false;
    } else {
      validatorVilleMsg.textContent = "Ville valide";
      bollVille = true;
    }
  });
}
