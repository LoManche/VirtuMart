import * as React from "react";
import ProductCarousel from "../components/productCarousel";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

//function to show order status as a progress bar
function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);
  const state = 25;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return Math.min(oldProgress + 25, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <LinearProgress color="secondary" variant="determinate" value={state} />;
}
//function to display a single product
function ProductInstance({ img, title, price, quantity }) {
  return (
    <div>
      <div style={{ display: "flex", marginLeft: "100px", marginRight: "10px", width: "600px" }}>
        <div>
          <img
            src={img}
            style={{ maxHeight: "200px", width: "300px", borderRadius: "5px", margin: "30px" }}
          />
        </div>
        <div style={{ width: "200px" }}>
          <h1 style={{ marginBottom: "1px", width: "200px" }}>{title}</h1>
          <p style={{ margin: "1px 0px 1px 0px" }}>${price.toFixed(2)}</p>
          <p>{quantity}</p>
          <p style={{ color: "#06B122", margin: "1px 0px 1px 0px" }}>In Stock</p>
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
//to display order address
function OrderAddress() {
  return (
    <div>
      <p>29C, Virtual Building, Virtual Street</p>
      <p>Virtual City</p>
      <p>Virtual Country</p>
    </div>
  );
}

function Orderitem({ Products, subtotal }) {
  let state = 25;
  return (
    <div style={{ display: "flex" }}>
      <div> //loop through products and call ProductInstance to display them
        {Products.map((Product, index) => (
          <div key={index} style={{ padding: "3px" }}>
            <ProductInstance
              img={Product.img}
              title={Product.title}
              price={Product.price}
              quantity={Product.quantity}
            />
          </div>
        ))}
      </div>
      <hr></hr> {/*vertical divider*/}
      <div style={{ marginLeft: "30px" }}>
        <div style={{ margin: "10px 10px" }}>
          <h2 style={{ marginBottom: "0" }}>Delivery</h2>
          //call LinearProgess to display order status as a progress bar
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={state}
            style={{ width: "400px" }}
          />
          <p>Order Date: 10/4/2024</p>
          <p>Expected Arrival: 14/4/2024</p>
        </div>
        <hr
          style={{
            borderTop: "1px solid #E0E0E0",
            margin: "2px 30px 0 0",
            width: "430px",
            textAlign: "left",
          }}></hr>
        //display order information
        <h2 style={{ margin: "1px 1px" }}>Address</h2>
        <hr
          style={{
            borderTop: "1px solid #E0E0E0",
            margin: "2px 30px 0 0",
            width: "430px",
            textAlign: "left",
          }}></hr>
        <div>
          <OrderAddress></OrderAddress>
        </div>
        <hr
          style={{
            borderTop: "1px solid #E0E0E0",
            margin: "5px 30px 0 0",
            width: "430px",
            textAlign: "left",
          }}></hr>
        <h2 style={{ margin: "1px 1px" }}>Order Summary</h2>
        <hr
          style={{
            borderTop: "1px solid #E0E0E0",
            margin: "2px 30px 0 0",
            width: "430px",
            textAlign: "left",
          }}></hr>
        <div style={{ display: "flex", width: "400px" }}>
          <div style={{ width: "200px" }}>
            //loop through products to calculate order sum
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
            margin: "2px 30px 0 0",
            width: "430px",
            textAlign: "left",
          }}></hr>
        <div style={{ textAlign: "right", width: "400px" }}>
          <h3>Total: ${subtotal.toFixed(2)}</h3>
        </div>
        <div style={{ textAlign: "right", width: "400px" }}>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              width: "120px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}>
            Buy Again
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Order() {
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
  ];
  const popularProducts = [
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
  for (let i = 0; i < Products.length; i++) {
    subtotal += Products[i].price;
  }
  return (
    <div>
      {/*header*/}
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "0 10px 5px 100px", width: "700px" }}>Order</h1>
        <div style={{ textAlign: "right", width: "700px" }}></div>
      </div>
      <hr style={{ borderTop: "2px solid black", margin: "0 0" }}></hr>
      {/*content*/}
      <Orderitem Products={Products} subtotal={subtotal}></Orderitem>
      <hr style={{ borderTop: "2px solid black", margin: "0 0", width: "1400px" }}></hr>
      <Orderitem Products={Products} subtotal={subtotal}></Orderitem>
      <hr style={{ borderTop: "2px solid black", margin: "0 0", width: "1400px" }}></hr>
      {/*Bottom*/}
      <div>
        <h2>Popular Products</h2>
        <ProductCarousel Products={popularProducts}></ProductCarousel>
      </div>
    </div>
  );
}
