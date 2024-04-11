import { TextField, Button } from "@mui/material";
import SnackbarButton from "./snackBar";
import { useState } from "react";
let quantity = 1;

function ProductQuantity() {
  const [numberInput, setNumberInput] = useState(1);

  const handleNumberInputChange = (event) => {
    setNumberInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Pass numberInput to another function or component
    getQuantity(numberInput);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        style={{ width: "40px", margin: "5px" }}
        defaultValue="1"
        size="small"
        onChange={handleNumberInputChange}
      />
    </form>
  );
}

function getQuantity(input) {
  quantity = input;
  console.log(quantity);
}

function ProductStock({ stock }) {
  if (stock > 0) return <p style={{ color: "#06B122" }}>In Stock</p>;
  else {
    return <p style={{ color: "red" }}>Out of Stock</p>;
  }
}

function AddToCartButton({ quantity }) {
  return (
    <SnackbarButton
      buttonStyle={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "8px",
        width: "100%",
        height: "50px",
      }}
      msg={"Add to Cart"}
      alert={"Successfully Added"}
      quantity={quantity}></SnackbarButton>
  );
}

export default function ProductDetails({ stock }) {
  return (
    <article>
      <ProductQuantity />
      <ProductStock stock={stock} />
      <AddToCartButton />
    </article>
  );
}
