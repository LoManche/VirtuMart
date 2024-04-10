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
      {/* <CardMedia
        sx={{ height: "400px" }}
        image={imageUrl}
        style={{ height: "400px", borderRadius: 10, objectFit: "contain" }}
      /> */}
      <Box display="flex" justifyContent="center" mb={1}>
        <Box width="300px">
          <img src={imageUrl} style={{ height: "200px", width: "100%", objectFit: "contain" }} />
        </Box>
      </Box>

      <Typography sx={{ fontWeight: "bold" }}>{productName}</Typography>
      <Typography color={"grey"}>{description}</Typography>
      <Box display={"flex"} alignItems={"center"}>
        {originalPrice ? (
          <>
            <Typography color={type === "productOnSale" ? "orange" : "black"}>${price}</Typography>
            <Box width={10} />
            {type === "productOnSale" ? (
              <Typography sx={{ textDecoration: "line-through" }}>${originalPrice}</Typography>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Typography color={type === "productOnSale" ? "orange" : "black"}>${price}</Typography>
        )}
      </Box>
    </Box>
  );
}
