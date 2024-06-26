import ProductInstance from "../components/productInstance";
import ProductCarousel from "../components/productCarousel";
import { TextField, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

//get default address from database and display
export function DefaultAddress() {
  return (
    <div style={{ display: "flex" }}>
      <Checkbox
        sx={{
          "&.Mui-checked": {
            color: "#1191D9",
          },
          marginTop: "90px",
        }}
      />
      <div>
        <p>29C, Virtual Building, Virtual Street</p>
        <p>Virtual City</p>
        <p>Virtual Country</p>
      </div>
    </div>
  );
}

//for inputting new address for ordering if user choose to use new address
export function AddressInput() {
  return (
    <div style={{ display: "flex" }}>
      <Checkbox
        sx={{
          "&.Mui-checked": {
            color: "#1191D9",
          },
          marginTop: "90px",
        }}
      />
      <div>
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          style={{ padding: "5px", width: "450px" }}
        />
        <TextField
          id="city"
          label="City"
          variant="outlined"
          style={{ padding: "5px", width: "150px" }}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          style={{ padding: "5px", width: "150px" }}
        />
        <TextField
          id="postalCode"
          label="Postal Code"
          variant="outlined"
          style={{ padding: "5px", width: "150px" }}
        />
      </div>
    </div>
  );
}
//display selected products
export default function ShoppingCart() {
  const productID = "1";
  let subtotal = 0;
  const Products = [
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      price: 70,
      originalPrice: "$100",
      productID: 1,
      description: "@tjdragotta",
      quantity: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      price: 50,
      productID: 1,
      description: "@katie_wasserman",
      quantity: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      price: 10,
      productID: 1,
      description: "@silverdalex",
      quantity: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      price: 15,
      productID: 1,
      description: "@shelleypauls",
      quantity: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      price: 30,
      productID: 1,
      description: "@peterlaster",
      quantity: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      price: 500,
      productID: 1,
      description: "@southside_customs",
      quantity: "1",
    },
  ];
//loop through price of products to get subtotal
  for (let i = 0; i < Products.length; i++) {
    subtotal += Products[i].price;
  }

  return (
    <div>
      {/*header*/}
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "0 10px 5px 100px", width: "700px" }}>Shopping Cart</h1>
        <div style={{ textAlign: "right", width: "700px" }}>
          //button to delete selected products
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              width: "120px",
              borderRadius: "8px",
              margin: "0 5px 0 5px",
              height: "40px",
              width: "200px",
            }}>
            Delete Selected
          </Button>
          //button to delete all products
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              width: "120px",
              borderRadius: "8px",
              margin: "0 5px 0 5px",
              height: "40px",
              width: "200px",
            }}>
            Delete All
          </Button>
        </div>
      </div>
      <hr style={{ borderTop: "2px solid black", margin: "0 0" }}></hr>
      {/*content*/}
      <div style={{ display: "flex" }}>
        <div>//loop though products and call component ProductInstance to display them
          {Products.map((Product, index) => (
            <div key={index} style={{ padding: "3px" }}>
              <ProductInstance img={Product.img} title={Product.title} price={Product.price} />
            </div>
          ))}
        </div>
        <hr></hr> {/*vertical divider*/}
        <div style={{ marginLeft: "30px" }}>//div for address input
          <div>
            <DefaultAddress></DefaultAddress>
          </div>
          <div>
            <AddressInput></AddressInput>
          </div>
          <hr
            style={{
              borderTop: "1px solid #E0E0E0",
              margin: "10px 30px 0 0",
              width: "500px",
              textAlign: "left",
            }}></hr>
          <div style={{ display: "flex", width: "400px" }}> //div for showing cart summary
            <div style={{ width: "200px" }}>
              {Products.map((Product, index) => (
                <p key={index}>
                  {Product.title} *{Product.quantity}
                </p>
              ))}
            </div>
            <div style={{ textAlign: "right", width: "200px" }}>
              {Products.map((Product, index) => (
                <p key={index}>${Product.price.toFixed(2)}</p>
              ))}
            </div>
          </div>
          <hr
            style={{
              borderTop: "1px solid #E0E0E0",
              margin: "10px 30px 0 0",
              width: "500px",
              textAlign: "left",
            }}></hr>
          <div style={{ textAlign: "right", width: "400px" }}>
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
          </div>
          //checkout button
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              width: "120px",
              borderRadius: "8px",
            }}>
            Checkout
          </Button>
        </div>
      </div>
      {/*Bottom*/}
      <div>
        <h2>Frequently bought together</h2>
        <ProductCarousel Products={Products}></ProductCarousel>
      </div>
    </div>
  );
}
