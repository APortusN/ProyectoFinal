let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const verCarrito = document.getElementById("verCarrito");

const cantidadCarrito = document.getElementById("cantidadCarrito");

const ventanaCarrito = document.getElementById("ventanaCarrito");

const enCarrito = document.getElementById("enCarrito");

fetch("./static/json/beers.json")
  .then((res) => res.json())
  .then((productos) =>{
    productos.data.forEach((producto) => {
      let content = document.createElement("div");
      content.className = "tarjeta";
      content.innerHTML = `
                          <img src= "${producto.foto}">
                          <h3>${producto.nombre}</h3>
                          <p>${producto.marca}</p>
                          <p>${producto.origen}</p>
                          <p>${producto.abv}</p>
                          <p class= "precio"> $ ${producto.precio}</p>
                          `;
      enCarrito.append(content);
      let agregarCarro = document.createElement("button");
      agregarCarro.innerHTML = `
                                <button>Agregar <i class="bi bi-cart-plus"></i></button>
                                ` ;
      agregarCarro.className = "agregarCarro";
      content.append(agregarCarro);

      agregarCarro.addEventListener("click", () => {
        const toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 800,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        toast.fire({
          icon: "success",
          title: "El producto fue añadido al carro",
          color: '#55565A',
        });

        const repetir = carrito.some(
          (repetirProducto) => repetirProducto.id === producto.id
        );
        if (repetir) {
          carrito.map((prod) => {
            if (prod.id === producto.id) {
              prod.cantidad++;
            }
          });
        } else {
          carrito.push({
              id: producto.id,
              foto: producto.foto,
              nombre: producto.nombre,
              marca: producto.marca,
              precio: producto.precio,
              cantidad: producto.cantidad,
          });
          console.log(carrito);
          console.log(carrito.length);
          registroCarrito();
          guardarLocalSt();
        }
      });
    })
  })
  .catch((error) => console.log(error));

const guardarLocalSt = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};

function obtenerDatos(){
  const URLGET="https://random-data-api.com/api/beer/random_beer?size=1";
  fetch(URLGET)
      .then(resultado => resultado.json())
      .then(data => {
          marca = data[0].brand;
          nombre= data[0].name;
          estilo= data[0].style;
          lupulo= data[0].hop;
          levadura= data[0].yeast;
          maltas= data[0].malts;
          ibus= data[0].ibu;
          abv= data[0].alcohol;
          document.getElementById("cervezaAleatoria").innerHTML += `
                                  <table>
                                          <tr>
                                              <th>Marca</th>
                                              <th>Nombre</th>
                                              <th>Estilo</th>
                                              <th>Lúpulo</th>
                                              <th>Levadura</th>
                                              <th>Maltas</th>
                                              <th>IBU</th>
                                              <th>ABV</th>
                                          </tr>
                                          <tr>
                                              <td>${marca}</td>
                                              <td>${nombre}</td>
                                              <td>${estilo}</td>
                                              <td>${lupulo}</td>
                                              <td>${levadura}</td>
                                              <td>${maltas}</td>
                                              <td>${ibus}</td>
                                              <td>${abv}</td>
                                          </tr>
                                  </table>
                                  `;
      });
}
obtenerDatos();

