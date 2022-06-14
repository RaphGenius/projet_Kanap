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
                console.log(product);
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