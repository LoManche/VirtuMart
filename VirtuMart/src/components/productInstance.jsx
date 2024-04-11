import Checkbox from "@mui/material/Checkbox";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const onClickEvent = ({ product_ID, customer_id }) => {
  const [cart, setCart] = useState({});
  useEffect(() => {
    const loadData = async () => {
      try {
        const cart = await Api.removeFromCart({
          product_id: { product_ID },
          customer_id: { customer_id },
        });
        setCart(cart);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

function GetProduct(product_ID) {
  const [product, setProduct] = useState({});
  useEffect(() => {
    const loadData = async () => {
      try {
        const product = await Api.getProductById({ product_id: product_ID });
        setProduct(product);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return product;
}

function Stock({ stock }) {
  if (stock > 0) return <p style={{ color: "#06B122" }}>In Stock</p>;
  else {
    return <p style={{ color: "red" }}>Out of Stock</p>;
  }
}

export default function ProductInstance({ product_ID, quantity }) {
  //const product = GetProduct(product_ID).product;
  quantity = 2;
  const product = [
    {
      imgURL: "https://m.media-amazon.com/images/I/8115fzlBBBL._AC_UL320_.jpg",
      title: "Men's Gordie Relaxed Fit Straight Leg Jeans",
      price: "39.06",
      stock: "27",
    },
  ];

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
        <div>
          <img
            src={product[0].imgURL}
            alt="image"
            style={{ maxHeight: "200px", borderRadius: "5px", margin: "30px" }}
          />
        </div>
        <div style={{ width: "200px" }}>
          <h3 style={{ marginBottom: "1px", width: "200px" }}>{product[0].title}</h3>
          <p style={{ margin: "1px 0px 1px 0px" }}>${product[0].price}</p>
          <TextField
            style={{ width: "40px", margin: "7px" }}
            defaultValue={quantity}
            size="small"
          />
          <div style={{ margin: "1px 0px 1px 0px" }}>
            <Stock stock={product[0].stock}></Stock>
          </div>
        </div>
        <div>
          <IconButton
            aria-label="delete"
            style={{ margin: "90px 10px 70px 30px" }}
            onClick={onClickEvent({ product_ID: { product_ID }, customer_ID: { customer_ID } })}>
            <DeleteIcon />
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
