const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const todo = document.getElementById('Todos');

products.forEach((product) => {
    todo.innerHTML += `
        <div class="card">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Precio: ${product.price}</p>
            <p>Cantidad: ${product.stock}</p>
        </div>
    `;
})

const buttonPrecioTotal = document.getElementById('precioTotal');
const PrecioTotal = document.getElementById('PrecioTotal');

buttonPrecioTotal.addEventListener('click', () => {
    const total = products.reduce((a, b) => a + b.price, 0);
    PrecioTotal.innerHTML = `El precio total es: ${total}`
})


const inputCategoria = document.getElementById('categoriaFiltro');
const Categoria = document.getElementById('Categoria');

inputCategoria.addEventListener('input', () => {
    const category = inputCategoria.value; 
    console.log(category)
    const filteredProducts = products.filter((product) => product.category === category);
    const html = filteredProducts.map((product) => `
        <div class="card">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>${product.price}</p>
            <p>${product.stock}</p>
        </div>
    `).join('');
    Categoria.innerHTML = html;
})

const inputNombre = document.getElementById('nombreFiltro');
const NombreFiltro = document.getElementById('NombreFiltro');

inputNombre.addEventListener('input', () => {
    const name = inputNombre.value;
    console.log(name)
    const filteredProducts = products.find((product) => product.name === name);
    const html = `
        <div class="card">
            <h3>${filteredProducts.name}</h3>
            <p>${filteredProducts.category}</p>
            <p>${filteredProducts.price}</p>
            <p>${filteredProducts.stock}</p>
        </div>;`
    NombreFiltro.innerHTML = html;
})

const disponibilidad = document.getElementById('disponibilidad');

const productDisponibles = products.every(product => product.stock > 0);
disponibilidad.innerHTML = `Todos los productos estan disponibles: ${productDisponibles}`

const Nombres = document.getElementById('Nombres');

const nombres = products.map(product => product.name);
Nombres.innerHTML = `Nombres: ${nombres}`