const productos = [
    {id: 1, nombre: "Vela", img: "./Imagenes/vela.jpg", precio: 2000},
    {id: 2, nombre: "Set de velas", img: "./Imagenes/velas.jpg", precio: 7000},
    {id: 3, nombre: "Set de te", img: "./Imagenes/sette.jpg", precio: 6000},
    {id: 4, nombre: "Tetera", img: "./Imagenes/tetera.jpg", precio: 3000},
    {id: 5, nombre: "Porta sahumerios", img: "./Imagenes/sahumerio.jpg", precio: 1000},
    {id: 6, nombre: "Taza", img: "./Imagenes/taza.jpg", precio: 1500}
];

const idDeCarrito = `ItemDeCarrito`
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
let buttonCarrito = document.getElementById('button-carrito');
buttonCarrito.innerHTML = `<button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-cart-shopping"></i>  Items: ${carrito.length} </button>`
let precioTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio,0);
console.log(precioTotal);

let tablaCompras = document.getElementById('tablaCarrito');
let cuerpoTabla = document.getElementById('cuerpoTabla')

carrito.forEach(producto => {
    let itemCarrito = document.createElement('tr') 
    itemCarrito.innerHTML +=`
        <tr id=${idDeCarrito}>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <button type="button" class="btn btn-outline-danger align-middle"> X </button>
        </tr>`
    cuerpoTabla.appendChild(itemCarrito);

    let totalCompra = document.getElementById('totalCompra');
    totalCompra.innerHTML = `<tr><th scope="col">Precio total: $${precioTotal}</th></tr>`
});

//Crear cards
let cards = document.getElementById("cards");
productos.forEach((producto) => {
    const buttonId = `${producto.id}`;
    let cards = document.getElementById("cards");
    cards.innerHTML += `
    <div class="card">
        <img src="${producto.img}" class="card-img-top" alt="producto">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-title">$${producto.precio}</h6>
            <a class="btn btn-secondary" id=${buttonId}>Agregar al carrito</a>
        </div>
    </div>`
});

//Agregar al carrito
productos.forEach((producto) => {
    const buttonId = `${producto.id}`
    document.getElementById(buttonId).addEventListener('click', () =>{
        let indexProducto = productos.findIndex(producto => producto.id == buttonId);
        let productoAgregado = productos[indexProducto];
        carrito.push(productoAgregado);
        console.log(carrito);
        buttonCarrito.innerHTML = `<button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-cart-shopping"></i>  Items: ${carrito.length} </button>`
        let precioTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio,0);
        console.log(precioTotal);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        let itemCarrito = document.createElement('tr') 
        itemCarrito.innerHTML +=`
            <tr id=${idDeCarrito}>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <button type="button" class="btn btn-outline-danger align-middle"> X </button>
            </tr>`
        cuerpoTabla.appendChild(itemCarrito);

        let totalCompra = document.getElementById('totalCompra');
        totalCompra.innerHTML = `<tr><th scope="col">Precio total: $${precioTotal}</th></tr>`

        //tostify
        Toastify({
            text: "Se agrego el producto al carrito!",
            className: "info",
            style: {background: "#e8c7bd",}
        }).showToast();

    })
} )
console.log(carrito)

//vaciar carrito
function vaciarCarrito(){
    carrito.splice(0,carrito.length);
    localStorage.clear();
    buttonCarrito.innerHTML = `<button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-cart-shopping"></i>  Items: 0 </button>`
    
    cuerpoTabla.innerHTML = ``

    let totalCompra = document.getElementById('totalCompra');
    totalCompra.innerHTML = `<tr><th scope="col">Precio total: $0 </th></tr>`;

    console.log(carrito);
}
