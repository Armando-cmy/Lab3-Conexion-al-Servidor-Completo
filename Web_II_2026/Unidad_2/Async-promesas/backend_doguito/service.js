import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './conexión.js';

dotenv.config();

const app = express(); //llamadas a express en variable
app.use(cors());//uso con cors
app.use(express.json());//uso de archivo json
//get listar
app.get('/clientes', async (req, res) => {
    try {
        const [rows]= await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}); 
//get por id
app.get('/clientes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [rows]= await pool.query(
            'SELECT * FROM clientes WHERE id=?',[req.params.id]);
            if(rows.length === 0){
            return res.status(404).json({error: 'Cliente no encontrado'});
        }
        res.json(rows[0]);
        // verificacion de que existe  cliente
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
//post  crear clientes
app.post('/clientes', async (req, res) => {
    try {
        const { id,nombre, email } = req.body;

        await pool.query(
            'INSERT INTO clientes (id,nombre, email) VALUES (?, ?, ?)',
            [id,nombre, email]
        );

        res.status(201).json({ message: 'Cliente creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//put actualizar cliente
app.put('/clientes/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, email} = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id=?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({error: 'Cliente no encontrado'});
        }
        await pool.query('UPDATE clientes SET nombre=?, email=? WHERE id=?', [nombre, email, id]);
        res.json({message: 'Cliente actualizado'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
//put
app.put('/clientes/:id', async (req, res) => {
        try {
            const {nombre, email} = req.body;
        await pool.query('UPDATE clientes SET nombre=?, email=? WHERE id=?', [nombre, email, req.params.id]);
        res.json({message: 'Cliente actualizado'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
//delete
app.delete('/clientes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await pool.query('DELETE FROM clientes WHERE id=?', [req.params.id]);
        res.json({message: 'Cliente eliminado'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener producto por ID
app.get('/productos/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id=?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear producto
app.post('/productos', async (req, res) => {
    try {
        const { id, nombre, precio } = req.body;
        await pool.query('INSERT INTO productos (id, nombre, precio) VALUES (?, ?, ?)', [id, nombre, precio]);
        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const [result] = await pool.query('UPDATE productos SET nombre=?, precio=? WHERE id=?', [nombre, precio, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/productos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM productos WHERE id=?', [req.params.id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/mascotas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mascotas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/mascotas/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 
app.post('/mascotas', async (req, res) => {
    try {
        const { id, id_dueno, nombre, edad, raza, peso } = req.body;
        await pool.query(
            'INSERT INTO mascotas (id, id_dueno, nombre, edad, raza, peso) VALUES (?, ?, ?, ?, ?, ?)',
            [id, id_dueno, nombre, edad, raza, peso]
        );
        res.status(201).json({ message: 'Mascota registrada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/mascotas/:id', async (req, res) => {
    const { id } = req.params;
    const { id_dueno, nombre, edad, raza, peso } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE mascotas SET id_dueno=?, nombre=?, edad=?, raza=?, peso=? WHERE id=?',
            [id_dueno, nombre, edad, raza, peso, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.json({ message: 'Datos de la mascota actualizados' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/mascotas/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM mascotas WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.json({ message: 'Mascota eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});