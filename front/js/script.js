fetch ("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json() ;
        }
    })
    // Creer un produit pour l'éléments produits
    .then(function(products){
        console.log(products);
        for(let i = 0; i < products.length; i++){
            const product = products[i];
            console.log(product);
            canapCard(product);
        }
        

    })
    .catch(function(err){
        window.alert(`Pas de contact avec l'api. Erreur ${err}`);
    })

    
function canapCard (product) {
    // LIEN VERS PRODUITS
    let canapLink = document.createElement("a");
    canapLink.setAttribute("href","./product.html?id=42");
    let canapArticle = document.createElement("article");

    //PHOTO
    let canapPict = document.createElement("img");
    canapPict.setAttribute("alt", product.altTxt); // attribut 
    canapPict.src = product.imageUrl;


    //Titre
    let canapTitle = document.createElement("h3");
    canapTitle.classList.add("productName")
    canapTitle.textContent = product.name

    //DESCRIPTION
    let canapDescription = document.createElement("p");
    canapDescription.classList.add("productDescription")
    canapDescription.textContent = product.description;

    // AJOUT DES ELEMENTS
    let canapSection = document.getElementById("items");
    canapSection.appendChild(canapLink);
    canapLink.appendChild(canapArticle)

    canapArticle.appendChild(canapPict);
    canapArticle.appendChild(canapTitle);
    canapArticle.appendChild(canapDescription);


} 



