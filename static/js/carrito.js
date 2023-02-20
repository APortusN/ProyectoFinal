const carritoPop = () => {    
    ventanaCarrito.innerHTML = "";
    ventanaCarrito.style.display = "flex";
    const tituloVentana = document.createElement("div");
    tituloVentana.className = "tituloVentana";
    tituloVentana.innerHTML = `
                            <h1 class="titulo-ventana">Carro de compras:</h1>
                            `;
    ventanaCarrito.append(tituloVentana);
    const cerrarVentana = document.createElement("h1");
    cerrarVentana.innerHTML = `
                            <i class="bi bi-x-circle"></i>
                            `;
    cerrarVentana.className = "botonCerrar";
    cerrarVentana.addEventListener("click", () => {
        ventanaCarrito.style.display = "none";
    });

    tituloVentana.append(cerrarVentana);

    carrito.forEach((producto) => {
        let contenidoEnCarrito= document.createElement("div");
        contenidoEnCarrito.id = "enCarrito";
        contenidoEnCarrito.className = "contenidoEnVentana";
        contenidoEnCarrito.innerHTML = `
                                    <img src= "${producto.foto}" alt="tarjetaCerveza">
                                    <p>${producto.nombre}</p>
                                    <p>${producto.marca}</p>
                                    <p> $ ${producto.precio} </p>
                                    <h6>Cantidad: ${producto.cantidad}</h6>
                                    <h2 class= "eliminarBeer"><i class="bi bi-dash-circle"></i></h2>
                                    <h2 class= "agregarBeer"><i class="bi bi-plus-circle"></i></h2>
                                    <p>Total: $ ${producto.cantidad * producto.precio}</p> 
                                    <h2 class= "borraProducto"> <i class="bi bi-trash3"></i></h2>
                                    `;
        ventanaCarrito.append(contenidoEnCarrito);        
        let eliminarBeer = contenidoEnCarrito.querySelector(".eliminarBeer");
        eliminarBeer.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--;
                guardarLocalSt();
                carritoPop();
            }
        });

        let agregarBeer = contenidoEnCarrito.querySelector(".agregarBeer");
        agregarBeer.addEventListener("click", () => {
            producto.cantidad++;
            guardarLocalSt();
            carritoPop();
        });

        let eliminar = contenidoEnCarrito.querySelector(".borraProducto");
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });
    });

    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "totalCarritoIn";
    totalCompra.innerHTML = `Total: $ ${total} `;
    ventanaCarrito.append(totalCompra);

    const botonCompra = document.createElement("button");
    botonCompra.className = "comprarBtn";
    botonCompra.innerText = "Ir a pagar";
    botonCompra.addEventListener("click", () => {
        Swal.fire({
            text: "Por favor, clic en aceptar para confirmar la compra.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:"#98FB98",
            cancelButtonColor: "#FF6347",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",            
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text:"¡Gracias por tu compra!",
                    showConfirmButton: false,
                });
            }
            setTimeout(() => {
                localStorage.clear();
                document.location.reload();
            }, 3000);
            }
        );
    });
    ventanaCarrito.append(botonCompra);
};

const eliminarProducto = (id) => {
    const buscarId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId;
    });
    registroCarrito();
    guardarLocalSt();
    carritoPop();
};

const registroCarrito = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

verCarrito.addEventListener("click", carritoPop);
registroCarrito();
