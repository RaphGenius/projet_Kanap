fetch(`http://localhost:3000/api/products/`)
.then(function(res){
    if(res.ok){
        return res.json();
    }
    
})

// Création résume du panier 

function resumePanier (){
    let section = document.getElementById("cart__items");

    //article
    let article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", "product-ID");  // CHANGER VALEUR !!
    article.setAttribute("data-color","product-color"); // CHANGER VALEUR !!

    // Image 
    let divImage = document.createElement('div')
    let imgCanap = document.createElement("img")
    divImage.classList.add("cart__item__img")
    imgCanap.setAttribute("src", "../images/banniere.png")// CHANGER VALEUR !!
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
    changeQuantity.setAttribute("value", "42") // CHANGER VALEUR !!
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
    `<h2>Nom du produit</h2> 
    <p>Vert</p>
    <p>42,00 €</p>`// CHANGER VALEUR !!
    itemContent.appendChild(itemSettings);
    itemSettings.appendChild(itemQuantity);
    itemQuantity.appendChild(showQuantity);
    showQuantity.textContent = `Qté : 50` // CHANGER VALEUR !!
    itemQuantity.appendChild(changeQuantity);
    itemSettings.appendChild(itemDelete);
    itemDelete.appendChild(buttonDelete)



}

resumePanier()