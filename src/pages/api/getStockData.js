import mysql from "mysql2/promise";

export default async function handler(req, res) {
    
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview",
    });

    try {

        const query = `SELECT * FROM stock`;
        const values = []
        const [data] = await db.execute(query, values);
        
        res.status(200).json({ success: true, stocks: data });

    } catch (error) {
        res.status(500).json({error: error.message});
    } finally {
        db.end()
    }

}
