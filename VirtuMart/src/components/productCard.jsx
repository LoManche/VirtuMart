/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import { Box, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ProductCard({
  type,
  imageUrl,
  productName,
  price,
  description,
  productId,
  originalPrice,
}) {
  const navigate = useNavigate();
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      flexDirection={"column"}
      onClick={() => {
        navigate(`/product/${productId}`);
      }}>
      <CardMedia sx={{ height: "400px" }} image={imageUrl} style={{ borderRadius: 10 }} />
      <Typography sx={{ fontWeight: "bold" }}>{productName}</Typography>
      <Typography color={"grey"}>{description}</Typography>
      <Box display={"flex"} alignItems={"center"}>
        {originalPrice ? (
          <>
            <Typography color={type === "productOnSale" ? "orange" : "black"}>{price}</Typography>
            <Box width={10} />
            <Typography sx={{ textDecoration: "line-through" }}>{originalPrice}</Typography>
          </>
        ) : (
          <Typography color={type === "productOnSale" ? "orange" : "black"}>{price}</Typography>
        )}
      </Box>
    </Box>
  );
}
