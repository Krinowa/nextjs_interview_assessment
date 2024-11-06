import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import styles from "./styles.module.css";

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "stockName", label: "Stock Name" },
  { key: "price", label: "Price" },
  { key: "qty", label: "Quantity" },
  { key: "action", label: "Actions" }
];

const MainMenu = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    stockId: "",
    stockName: "",
    price: "",
    qty: "",
  });

  const fetchStocks = async () => {
    try{
      const res = await fetch('/api/getStockData');
      const data = await res.json()
      if (data.success) {
        setStocks(data.stocks);
      }
    } catch (error) {
      console.error("Fetch to fetch stocks:", error);
    }
  }

  useEffect(() => {
    fetchStocks();
    if (selectedStock) {
      setFormData({
        id: selectedStock.id,
        stockId: selectedStock.stock_id,
        stockName: selectedStock.stock_name,
        price: selectedStock.price,
        qty: selectedStock.quantity,
      });
    }
  }, [selectedStock]);

  const handleAddStockClick = () => {
    router.push("/addstock");
  };

  const handleEditClick = (stock) => {
    setSelectedStock(stock);
    setFormData(stock);
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUdpate = async () => {
    try {
      const res = await fetch('/api/updateStockData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          stockId: formData.stockId,
          stockName: formData.stockName,
          price: parseFloat(formData.price),
          qty: parseInt(formData.qty, 10)
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchStocks(); 
        onOpenChange(false);
        alert('Stock updated successfully');
      } else {
        console.error('Failed to update stock:', data.message);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleDelete = async (stock) => {
    const confirmDelete = confirm(`Are you sure want to delete ${stock.stock_name}?`);

    if (confirmDelete) {
      try {
        const res = await fetch('/api/deleteStockData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: stock.id }),
        });
  
        const data = await res.json();
  
        if (data.success) {
          console.log('Stock deleted successfully');
          fetchStocks();

        } else {
          console.error('Failed to delete stock:', data.message);
        }
      } catch (error) {
        console.error('Error deleting stock:', error);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.heading}>Stock Manager123</h1>
        <Button className={styles.addButton} onClick={handleAddStockClick}>Add Stock</Button>
      </div>
      <Table aria-label="Stock Manager Table" className={styles.customTable}>
        <TableHeader>
          {COLUMNS.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell>{stock.stock_id}</TableCell>
              <TableCell>{stock.stock_name}</TableCell>
              <TableCell>RM {stock.price}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>
                <Button className={styles.editButton} onClick={() => handleEditClick(stock)}>Edit</Button>{" "}
                <Button className={styles.deleteButton} onClick={() => handleDelete(stock)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className={styles.modalHeader}>Edit Stock</ModalHeader>
                  <ModalBody className={styles.modalBody}>
                    <Input
                      className={styles.modalInput}
                      label="Stock ID"
                      placeholder="Enter Stock ID"
                      name="stockId"
                      defaultValue={selectedStock.stock_id}
                      onChange={handleChange}
                    />
                    <Input
                      className={styles.modalInput}
                      label="Stock Name"
                      placeholder="Enter Stock Name"
                      name="stockName"
                      defaultValue={selectedStock.stock_name}
                      onChange={handleChange}
                    />
                    <Input
                      className={styles.modalInput}
                      label="Price"
                      type="number"
                      placeholder="Enter Price"
                      name="price"
                      defaultValue={selectedStock.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                    />
                    <Input
                      className={styles.modalInput}
                      label="Quantity"
                      type="number"
                      placeholder="Enter Quantity"
                      name="qty"
                      defaultValue={selectedStock.quantity}
                      onChange={handleChange}
                      min="0"
                    />
                  </ModalBody>
                  <ModalFooter className={styles.modalFooter}>
                    <Button className={styles.closeButton} onPress={onClose}>Close</Button>
                    <Button className={styles.saveButton} onPress={handleUdpate}>Save</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default MainMenu;
