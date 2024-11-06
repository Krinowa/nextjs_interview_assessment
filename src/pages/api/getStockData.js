// import mysql from "mysql2/promise";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET"){
        try {
            const stocks = await prisma.stock.findMany();
            res.status(200).json({ success: true, stocks: stocks });
        } catch (error) {
            console.error('Error fetching stocks:', error);
            res.status(500).json({ success: false, error: error.message });
        } finally {
            await prisma.$disconnect();
        }    
    }
    else {
        res.status(405).json({ message: 'Request method not allowed' });
    }

}
