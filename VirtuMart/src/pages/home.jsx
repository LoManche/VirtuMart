import { Grid } from "@mui/material";
import ProductCard from "../components/productCard";

export default function Home() {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <ProductCard
          imageUrl={
            "https://off.com.ph/-/media/images/off/ph/products-en/update-983/plp/overtime-group-plp.png"
          }
          price={"$100"}
          description={"Product Description"}
          productName={"Test"}
          productId={1}
        />
      </Grid>
    </Grid>
  );
}
