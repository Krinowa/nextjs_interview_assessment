import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { stockId, stockName, price, qty } = req.body;

    try {
      const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview",
      });

      const query = `INSERT INTO stock (stock_id, stock_name, price, quantity) VALUES (?, ?, ?, ?)`;
      await db.execute(query, [stockId, stockName, price, qty]);

      db.end();

      res.status(200).json({ success: true, message: 'Stock added successfully' });
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ success: false, message: 'Failed to add stock'});
    }
  } else {
    res.status(405).json({ message: 'Request method not allowed' });
  }
}
