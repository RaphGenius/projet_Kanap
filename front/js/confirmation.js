// Recuperer l'id en paramettre de l'url
let url_str = window.location;
let url = new URL(url_str);
let search_params = url.searchParams;
let productId = search_params.get("orderId");

// Ecrit l'idOrder récuperer pour l'afficher
document.getElementById("orderId").textContent = productId;
