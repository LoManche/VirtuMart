/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ imageUrl, productName, price, description, productId }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ m: 1, height: 150 }} image={imageUrl} title={productName} />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box px="16px" display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" color="red">
          {price}
        </Typography>

        <Box display={"flex"} justifyContent={"end"}>
          <CardActions>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={() => navigate("/product/" + productId)}>
              Details
            </Button>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              sx={{ backgroundColor: "#ECECEC" }}>
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}
