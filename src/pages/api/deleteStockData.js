import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const stock = await prisma.stock.delete({
        where: { id: id },
      });

      res.status(200).json({ success: true, message: 'Stock deleted successfully', stock });

    } catch (error) {
      console.error('Error deleting stock:', error);
      res.status(500).json({ success: false, message: 'Failed to delete stock' });
    } finally {
      await prisma.$disconnect();
    }
  } 
  else {
    res.status(405).json({ message: 'Request method not allowed' });
  }
}
