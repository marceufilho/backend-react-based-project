const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3001;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/data', express.static(path.join(__dirname, 'data')));  // Serve static files

// Initialize database
const db = new sqlite3.Database('./data/clientes.db');

// Fetch all clients
app.get('/data/clientes', (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Update client status
app.patch('/data/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.run("UPDATE clientes SET status = ? WHERE id = ?", [status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Status updated successfully', changes: this.changes });
  });
});

// Update downloads for a company
app.patch('/update-downloads/:id', (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE clientes SET downloads = downloads + 1 WHERE id = ? AND downloads < pacientes`, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Downloads updated for company with ID ${id}`);
  });
});

// Update status to relatorio for a company
app.patch('/update-status-relatorio/:id', (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE clientes SET status = 'relatório' WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Status updated to relatório for company with ID ${id}`);
  });
});

app.post('/upload-relatorio/:id', upload.single('file'), (req, res) => {
  const id = req.params.id;
  // You can save the file info to the database if needed
  res.send(`File uploaded for company with ID ${id}`);
});


// Endpoint to increment the relatorio field
app.patch('/increment-relatorio/:id', (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE clientes SET relatorio = relatorio + 1 WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Relatorio incremented for company with ID ${id}`);
  });
});

// Update downloads count for a company
app.patch('/update-downloads/:id', (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE clientes SET downloads = downloads + 1 WHERE id = ? AND downloads < pacientes`, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Downloads updated for company with ID ${id}`);
  });
});

// Update status to relatorio for a company
app.patch('/update-status-relatorio/:id', (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE clientes SET status = 'relatório' WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Status updated to relatório for company with ID ${id}`);
  });
});

// Update status to finalizado for a company
app.patch('/update-status-finalizado/:id', (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE clientes SET status = 'finalizado' WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Status updated to finalizado for company with ID ${id}`);
  });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

