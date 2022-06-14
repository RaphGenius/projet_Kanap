fetch ("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json() ;
        }
    })
    // Creer un produit 
    .then(function(products){
        for(let i = 0; i < products.length; i++){
            const product = products[i];
            console.log(product);
            canapCard(product);
        }
        

    })
    .catch(function(err){
        window.alert(`Pas de contact avec l'api. Erreur ${err}`);
    })

    
    // CREER UNE CARTE 
 function canapCard (product) {
    // Liens vers page produits

    let canapLink = document.createElement("a");
    canapLink.setAttribute("href",`./product.html?id=${product._id}`);
    let canapArticle = document.createElement("article");

    //photo
    let canapPict = document.createElement("img");
    canapPict.setAttribute("alt", product.altTxt); // attribut 
    canapPict.src = product.imageUrl;


    //Titre
    let canapTitle = document.createElement("h3");
    canapTitle.classList.add("productName")
    canapTitle.textContent = product.name

    //description
    let canapDescription = document.createElement("p");
    canapDescription.classList.add("productDescription")
    canapDescription.textContent = product.description;

    // ajout des éléments
    let canapSection = document.getElementById("items");
    canapSection.appendChild(canapLink);
    canapLink.appendChild(canapArticle)

    canapArticle.appendChild(canapPict);
    canapArticle.appendChild(canapTitle);
    canapArticle.appendChild(canapDescription);
} 

/* function lienProduits (product){
   let str = "http://127.0.0.1:5501/front/html/product.html?id=42";
   let url = new URL(str);
   let idProduit = url.searchParams.get(product._id)
   
}

 */