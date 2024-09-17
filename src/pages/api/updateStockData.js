import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const {id, stockId, stockName, price, qty } = req.body;

    try {
      const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview",
      });

      const query = `UPDATE stock SET stock_id = ?, stock_name = ?, price = ?, quantity = ? WHERE id = ?`;
      await db.execute(query, [stockId, stockName, price, qty, id]);

      db.end();

      res.status(200).json({ success: true, message: 'Stock updated successfully'});
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).json({ success: false, message: 'Failed to update stock'});
    }
  } else {
    res.status(405).json({ message: 'Request method not allowed'});
  }
}
