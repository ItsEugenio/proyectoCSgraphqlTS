const express = require('express');
const { Request, Response } = require('express');

const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Notificación recibida:');
    console.log(req.body);

    res.status(200).json({ message: 'Notificación recibida exitosamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor de prueba del webhook funcionando en http://localhost:${PORT}`);
});
