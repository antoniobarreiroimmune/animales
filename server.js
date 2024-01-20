const express = require('express');
const app = express();

let animales = [
    { nombre: "Rula", edad: 7, tipo: "Perro" },
    { nombre: "Chico", edad: 9, tipo: "Perro" },
    { nombre: "Jack", edad: 9, tipo: "Perro" }
];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let html = '<h1>Lista de Animales</h1>';
    html += '<ul>';
    animales.forEach(animal => {
        html += `<li>${animal.nombre} - ${animal.edad} años - ${animal.tipo} 
                 <form action="/adoptar" method="post" style="display: inline;">
                     <input type="hidden" name="nombre" value="${animal.nombre}">
                     <button type="submit">Adoptar</button>
                 </form>
                 </li>`;
    });
    html += '</ul>';

    html += `
        <h2>Añadir un Nuevo Animal</h2>
        <form action="/sumar-animal" method="get">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" required>
            <label for="tipo">Tipo:</label>
            <input type="text" id="tipo" name="tipo" required>
            <button type="submit">Añadir Animal</button>
        </form>
    `;

    res.send(html);
});

app.get('/sumar-animal', (req, res) => {
    const { nombre, edad, tipo } = req.query;
    if (nombre && edad && tipo) {
        animales.push({ nombre, edad, tipo });
        res.redirect('/');
    } else {
        res.send('Todos los campos son obligatorios.');
    }
});

app.post('/adoptar', (req, res) => {
    const { nombre } = req.body;
    animales = animales.filter(animal => animal.nombre !== nombre);
    res.redirect('/');
});

app.listen(  process.env.PORT || 3000, (e)=>{
    e
    ? console.error('Error en servidor.')
    : console.log('Servidor escuchando en el puerto: ' + (process.env.PORT || 3000))
})
