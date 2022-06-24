let panier = JSON.parse(localStorage.getItem("produits"));
let totalCanapQuantity = 0;
let totalCanapPrice = 0
for (let i = 0; i < panier.length; i++){
    const produitLs = panier[i];
    let produitComplet; 
    fetch("http://localhost:3000/api/products/"+produitLs.idCanap)
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then((item)=> {
        produitComplet = {...produitLs, ...item}
        resumePanier(produitComplet);  
        quantityTotal(produitComplet);
        priceTotal(produitComplet)
        quantityChange()
        removeQuantity()
    })
    
    .catch(function(err){
        window.alert(`Pas de contact avec l'api.${err}`);
    })
}

// total des quantités de produit
function quantityTotal (produitComplet) {
    let showQuantity = document.getElementById("totalQuantity");
    totalCanapQuantity += parseInt(produitComplet.quantityCanap) ;
    showQuantity.textContent = totalCanapQuantity
    
}
// Prix total des produits
function priceTotal(produitComplet){
    let showPrice = document.getElementById("totalPrice");
    totalCanapPrice += produitComplet.price*produitComplet.quantityCanap;
    showPrice.textContent = totalCanapPrice
}

// Création résume du panier 
function resumePanier (produitComplet){
    let section = document.getElementById("cart__items");

    //article
    let article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", `${produitComplet.idCanap}`);  // CHANGER VALEUR !!
    article.setAttribute("data-color",`${produitComplet.colorCanap}`);// CHANGER VALEUR !!

    // Image 
    let divImage = document.createElement('div')
    let imgCanap = document.createElement("img")
    divImage.classList.add("cart__item__img")
    imgCanap.setAttribute("src", produitComplet.imageUrl)// CHANGER VALEUR !!
    imgCanap.setAttribute("alt", "Photographie d'un canapé")

    // Description 
    let itemContent = document.createElement("div");
    itemContent.classList.add("cart__item__content")
    let itemDescription = document.createElement("div")
    itemDescription.classList.add("cart__item__content__description")

    // Choix quantité
    let itemSettings = document.createElement("div");
    itemSettings.classList.add("cart__item__content__settings")
    let itemQuantity = document.createElement("div");
    itemQuantity.classList.add("cart__item__content__settings__quantity")
    let showQuantity = document.createElement("p");
    let changeQuantity = document.createElement("input");
    changeQuantity.setAttribute("type","number")
    changeQuantity.setAttribute("name","itemQuantity")
    changeQuantity.setAttribute("min", "1")
    changeQuantity.setAttribute("max", "100")
    changeQuantity.setAttribute("value", produitComplet.quantityCanap) 
    changeQuantity.classList.add("itemQuantity");

    // Suppression élément 
    let itemDelete = document.createElement("div");
    itemDelete.classList.add("cart__item__content__settings__delete");
    let buttonDelete = document.createElement("p");
    buttonDelete.classList.add("deleteItem");
    buttonDelete.textContent = `Supprimer`

    // Ajout des éléments
    section.appendChild(article);
    article.appendChild(divImage);
    divImage.appendChild(imgCanap);
    article.appendChild(itemContent);
    itemContent.appendChild(itemDescription);
    itemDescription.innerHTML = 
    `<h2>${produitComplet.name}</h2> 
    <p>${produitComplet.colorCanap}</p>
    <p>${produitComplet.price}€</p>`// CHANGER VALEUR !! // CHANGER VALEUR !!
    itemContent.appendChild(itemSettings);
    itemSettings.appendChild(itemQuantity);
    itemQuantity.appendChild(showQuantity);
    showQuantity.textContent = `Qté :` 
    itemQuantity.appendChild(changeQuantity);
    itemSettings.appendChild(itemDelete);
    itemDelete.appendChild(buttonDelete)
}

function quantityChange (){
    let quantityChange = document.querySelectorAll("input.itemQuantity")
    for(let i = 0; i < quantityChange.length; i++){
        quantityChange[i].addEventListener("change", (e) => {
            console.log(quantityChange[i]);
            let quantityChosen = panier[i].quantityCanap; 
            let quantityValue = quantityChange[i].value;    

            let quantityChanged = panier.find((element) => element.quantityValue != quantityChosen)
            quantityChanged.quantityCanap = quantityValue;
            localStorage.setItem("produits", JSON.stringify(panier))
        })
    }
    

}

function removeQuantity(){
    let btnRemove = document.getElementsByClassName("deleteItem");
    console.log(btnRemove);
    for(let i = 0; i < btnRemove.length; i++){
        btnRemove[i].addEventListener("click", (e)=> {
            console.log(btnRemove[i]);
            /* let cart = document.getElementsByClassName("cart__item");
            console.log(cart);
            for(let i = 0; i < cart.length; i++){
                let remove = cart[i]
                console.log(remove);
                remove.remove(); 
            } */

        })
    }
}



