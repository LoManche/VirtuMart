import Checkbox from "@mui/material/Checkbox";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

//function to display individual product with product image, title, price, quantity, stock status and delete button
export default function ProductInstance({ img, title, price }) {
  return (
    <div>
      <div style={{ display: "flex", marginLeft: "100px", marginRight: "10px", width: "600px" }}>
        <div>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#1191D9",
              },
              marginTop: "90px",
            }}
          />
        </div>
        <div>//product image
          <img
            src={img}
            style={{ maxHeight: "200px", width: "300px", borderRadius: "5px", margin: "30px" }}
          />
        </div>
        <div style={{ width: "200px" }}>
          <h1 style={{ marginBottom: "1px", width: "200px" }}>{title}</h1> //title
          <p style={{ margin: "1px 0px 1px 0px" }}>${price.toFixed(2)}</p> //price
          <TextField style={{ width: "40px", margin: "7px" }} defaultValue="1" size="small" /> //textbox for quantity
          <p style={{ color: "#06B122", margin: "1px 0px 1px 0px" }}>In Stock</p> //stock status
        </div>
        <div>
          <IconButton aria-label="delete" style={{ margin: "90px 10px 70px 30px" }}>
            <DeleteIcon /> //delete button
          </IconButton>
        </div>
      </div>
      <hr
        style={{
          borderTop: "1px solid #E0E0E0",
          margin: "0 30px 0 0",
          width: "800px",
          textAlign: "left",
        }}></hr>
    </div>
  );
}
