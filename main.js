const idDeCarrito = `ItemDeCarrito`
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
let buttonCarrito = document.getElementById('button-carrito');
buttonCarrito.innerHTML = `<button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-cart-shopping"></i>  Items: ${carrito.length} </button>`
let precioTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio,0);
console.log(precioTotal);

let tablaCompras = document.getElementById('tablaCarrito');
let cuerpoTabla = document.getElementById('cuerpoTabla');
let cantidad = 0


//refresh carrito -----------------------------------
carrito.forEach(producto => {
    let itemCarrito = document.createElement('tr') 
    itemCarrito.innerHTML +=`
        <tr id=${idDeCarrito}>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <button type="button" class="btn btn-outline-danger align-middle" onclick="eliminarItem(${producto.id})"    > X </button>
        </tr>`
    cuerpoTabla.appendChild(itemCarrito);

    let totalCompra = document.getElementById('totalCompra');
    totalCompra.innerHTML = `<tr><th scope="col">Precio total: $${precioTotal}</th></tr>`
});

const traerProductos = async() => {
    const response = await fetch('productos.json');
    const data = await response.json();
    
    //Crear cards --------------------------------------------------------------------
    let cards = document.getElementById("cards");
    data.forEach((producto) => {
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

    //Agregar al carrito -----------------------------------------------------------
    data.forEach((producto) => {
        const buttonId = `${producto.id}`
        document.getElementById(buttonId).addEventListener('click', () =>{
            let indexProducto = data.findIndex(producto => producto.id == buttonId);
            let productoAgregado = data[indexProducto];
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
                    <button type="button" class="btn btn-outline-danger align-middle" onclick="eliminarItem(${producto.id})"> X </button>
                </tr>`
            cuerpoTabla.appendChild(itemCarrito);

            let totalCompra = document.getElementById('totalCompra');
            totalCompra.innerHTML = `<tr><th scope="col">Precio total: $${precioTotal}</th></tr>`

            //tostify --------------------------------------
            Toastify({
                text: "Se agrego el producto al carrito!",
                className: "info",
                style: {background: "#e8c7bd",}
            }).showToast();

        })
    } )
    console.log(carrito)
}
traerProductos()

//vaciar carrito -----------------------------------------------------------
function vaciarCarrito(){
    Swal.fire({
        title: 'Estas seguro que queres vaciar el carrito?',
        icon: 'warning',    
        showCancelButton: true,
        confirmButtonText: 'si, vaciar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.splice(0,carrito.length);
            localStorage.clear();
            buttonCarrito.innerHTML = `<button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-cart-shopping"></i>  Items: 0 </button>`
            
            cuerpoTabla.innerHTML = ``
        
            let totalCompra = document.getElementById('totalCompra');
            totalCompra.innerHTML = `<tr><th scope="col">Precio total: $0 </th></tr>`;
        
            console.log(carrito);
            location.reload();
        } else if (result.isDenied) {
            Swal.fire('Gracias', '', 'success')
        }
    })
}

//eliminar item -------------------------------------------------------------
function eliminarItem(IdProducto){
    let indexEliminar = carrito.findIndex(eliminar => eliminar.id == IdProducto);
    console.log(indexEliminar)
    
    carrito.splice(indexEliminar,1);
    console.log(carrito)
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    location.reload();
}