import ProductInstance from "../components/productInstance";
import ProductCarousel from "../components/productCarousel";
import { TextField, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function DefaultAddress({ customer_id }) {
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const loadData = async () => {
      try {
        const customer = await Api.getProfile({ customer_id });
        setCustomer(customer);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <p>{customer.address}</p>
        <p>{customer.city}</p>
        <p>{customer.country}</p>
      </div>
    </div>
  );
}

function AddressInput() {
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

export default function ShoppingCart() {
  const productID = "1";
  let subtotal = 0;
  const cart = [
    {
      product_ID: "B07DD95XF9",
      quantity: 3,
    },
    {
      product_ID: "B00AWB13E4",
      quantity: 4,
    },
  ];
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

  for (let i = 0; i < Products.length; i++) {
    subtotal += Products[i].price;
  }

  return (
    <div>
      {/*header*/}
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "0 10px 5px 100px", width: "700px" }}>Shopping Cart</h1>
        <div style={{ textAlign: "right", width: "700px" }}>
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
        <div>
          {cart.map((cart, index) => (
            <div key={index} style={{ padding: "3px" }}>
              <ProductInstance product_ID={cart.product_ID} quantity={cart.quantity} />
            </div>
          ))}
        </div>
        <hr></hr> {/*vertical divider*/}
        <div style={{ marginLeft: "30px" }}>
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
          <div style={{ display: "flex", width: "400px" }}>
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
