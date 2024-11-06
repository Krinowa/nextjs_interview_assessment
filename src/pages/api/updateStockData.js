import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const {id, stockId, stockName, price, qty } = req.body;

    try {
      const updatedStock = await prisma.stock.update({
        where: { id:id },
        data: {
          stock_id: stockId,
          stock_name: stockName,
          price: price,
          quantity: qty,
        },
      });

      res.status(200).json({ success: true, message: 'Stock updated successfully'});
    
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).json({ success: false, message: 'Failed to update stock'});
    } finally {
      await prisma.$disconnect();
    }
  } 
  else {
    res.status(405).json({ message: 'Request method not allowed'});
  }
}
