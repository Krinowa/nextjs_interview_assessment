import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { stockId, stockName, price, qty } = req.body;

    try {
      const newStock = await prisma.stock.create({
        data: {
          stock_id: stockId,
          stock_name: stockName,
          price: price,
          quantity: qty,
        },
      });

      res.status(200).json({ success: true, message: 'Stock added successfully', stock: newStock });
    
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ success: false, message: 'Failed to add stock' });
    } finally {
      await prisma.$disconnect();
    }
  } 
  else {
    res.status(405).json({ message: 'Request method not allowed' });
  }
}
