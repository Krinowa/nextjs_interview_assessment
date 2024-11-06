import { useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const AddStock = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        stockId: "",
        stockName: "",
        price: "",
        qty: "",
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

    const handleSubmit = async () => {
        if (!formData.stockId || !formData.stockName || !formData.price || !formData.qty) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        try {
            const res = await fetch('/api/addStockData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stockId: formData.stockId,
                    stockName: formData.stockName,
                    price: parseFloat(formData.price),
                    qty: parseInt(formData.qty, 10),
                }),
            });
      
            const data = await res.json();
            console.log(data)
      
            if (data.success) {
                alert('Stock added successfully!');
                router.replace('/');
            } else {
                console.error('Failed to add stock:', data.message);
            }
          } catch (error) {
            console.error('Error adding stock:', error);
          }
    };

    const handleBackClick = () => {
        router.replace('/');
    };

  return (
    <div className={styles.formContainer}>
        <h1 className={styles.heading}>Add New Stock</h1>
            <form>
                <div className={styles.contentContainer}>
                    <Input
                        label="Stock ID"
                        placeholder="Enter Stock ID"
                        name="stockId"
                        onChange={handleChange}
                    />
                    <Spacer y={1.5} />
                    <Input
                        label="Stock Name"
                        placeholder="Enter Stock Name"
                        name="stockName"
                        onChange={handleChange}
                    />
                    <Spacer y={1.5} />
                    <Input
                        label="Price"
                        type="number"
                        placeholder="Enter Price"
                        name="price"
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                    />
                    <Spacer y={1.5} />
                    <Input
                        label="Quantity"
                        type="number"
                        placeholder="Enter Quantity"
                        name="qty"
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <Spacer y={1.5} />
                <div className={styles.buttonContainer}>
                    <Button className={styles.submitButton} onClick={() => handleSubmit()}>
                    Add Stock
                    </Button>{" "}
                    <Button className={styles.backButton} onClick={handleBackClick}>
                    Back
                    </Button>
                </div>
            </form>
    </div>
    );
};

export default AddStock;
