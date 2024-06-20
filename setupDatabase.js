const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/clientes.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      status TEXT,
      pacientes INTEGER,
      downloads INTEGER,
      relatorio INTEGER,
      calibragem TEXT
    )
  `);

  // Insert initial data
  const stmt = db.prepare("INSERT INTO clientes (nome, status, pacientes, downloads, relatorio, calibragem) VALUES (?, ?, ?, ?, ?, ?)");

  const clientes = [
    ["Copa D'Or", "backlog", 5, 0, 0, "/Doumento-calibragem.pdf"],
    ["CDPI", "backlog", 8, 0, 0, "/Doumento-calibragem.pdf"],
    ["Barra D'Or", "backlog", 69, 0, 0, "/Doumento-calibragem.pdf"],
    ["Miguel Couto", "backlog", 70, 0, 0, "/Doumento-calibragem.pdf"],
    ["Americas", "backlog", 30, 0, 0, "/Doumento-calibragem.pdf"]
  ];

  for (const cliente of clientes) {
    stmt.run(cliente);
  }

  stmt.finalize();
});

db.close();

