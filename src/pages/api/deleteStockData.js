import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview",
      });

      const query = `DELETE FROM stock WHERE id = ?`;
      await db.execute(query, [id]);

      db.end();

      res.status(200).json({ success: true, message: 'Stock deleted successfully' });
    } catch (error) {
      console.error('Error deleting stock:', error);
      res.status(500).json({ success: false, message: 'Failed to delete stock' });
    }
  } else {
    res.status(405).json({ message: 'Request method not allowed' });
  }
}
