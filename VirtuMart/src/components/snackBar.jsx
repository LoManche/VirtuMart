import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackbarButton({ buttonStyle, msg, alert, quantity }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    const [cart, setCart] = useState({});
    useEffect(() => {
      const loadData = async () => {
        try {
          const cart = await Api.addToCart({
            customer_id: "1",
            product_id: "B07DD95XF9",
            quantity: { quantity },
          });
          setCart(cart);
          console.log(quantity);
          console.log(cart);
        } catch (err) {
          handleError(err, () => {}, true);
          throw err;
        }
      };
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick} style={buttonStyle}>
        {msg}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  );
}
