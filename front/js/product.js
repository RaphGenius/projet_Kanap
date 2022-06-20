let url_str = window.location;
let url = new URL(url_str);
let search_params= url.searchParams;
let productId = search_params.get('id');


fetch ("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json() ;
        }
    })
    // Creer un produit pour l'éléments produits
    .then(function(products){ 
        products.forEach(product => {
            if(product._id === productId){
                canapPresentation(product)
                // Creer une option pour chaques couleurs
                for(const color of product.colors){
                    colorChoice(color)
                    console.log(color);
                }
            }
        });
    })
    .catch(function(err){
        window.alert(`Pas de contact avec l'api.${err}`);
    })


function canapPresentation (product){
    // photo
    let pictPresentation = document.createElement("img")
    document.querySelector(".item__img").appendChild(pictPresentation)
    pictPresentation.setAttribute("alt", product.altTxt)
    pictPresentation.src = product.imageUrl;

    // Titre
    document.getElementById("title").innerText = `${product.name}`

    // Prix 
    document.getElementById("price").innerText = `${product.price}`
    
    // description
    document.getElementById("description").innerText =`${product.description}`
}

// Creer une option pour couleur 
function colorChoice (color){
    let colorOpt = document.createElement("option");
    colorOpt.setAttribute("value",`${color}`)
    colorOpt.innerText = `${color}`
    document.getElementById("colors").appendChild(colorOpt);
}

// Stocker les valeurs dans le localStorage
///////////////////////////////////////////////

//Recuperer le panier
function getBasket (){
    if (localStorage.getItem("produit")){
        return JSON.parse(localStorage.getItem("produit"))
    } else {
        return []
    }
}

// Ajout un produit/quantité/coleur à l'objet
function addBasket (produit){
    let panier = getBasket(produit)
    panier.push(produit);
}

// Envoie le panier dans le local storage
function saveBasket (produit){
    localStorage.setItem("produit", JSON.stringify(produit))
}

// Event au click - 
document.getElementById("addToCart").addEventListener("click", () => {
    let produitPanier = {
        idCanap : productId,
        colorCanap : document.getElementById("colors").value,
        quantityCanap : document.getElementById("quantity").value
    }
    let arrProduit = [produitPanier]
    console.log(produitPanier);
    getBasket(arrProduit)
    addBasket(arrProduit)
    saveBasket(arrProduit)
    console.log(arrProduit);
})