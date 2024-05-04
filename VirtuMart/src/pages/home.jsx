// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    This is the home page, which displays the recommended products and products on sale

import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../components/productCard";
import photo from "../assets/homePage.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/appContext";
import Api from "../api";
import handleError from "../components/handleError";

function Banner() {
  var items = [
    {
      name: "See what's new!",
      price: "",
      productID: 1,
      description: " ",
      src: photo,
    },
  ];

  return (
    <Box display="flex" width="100%" justifyContent="center">
      <Carousel
        showArrows={true}
        autoplay={true}
        infiniteLoop={true}
        transitionTime={1}
        showThumbs={false}>
        {items.map((item, key) => (
          <Box
            key={key}
            height="400px"
            flexDirection={"column"}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}>
            <Typography variant="h1" sx={{ zIndex: 100 }}>
              {item.name}
            </Typography>
            <Typography sx={{ zIndex: 2 }}>{item.description}</Typography>
            <img
              alt={item.description}
              height="100%"
              src={item.src}
              style={{
                objectFit: "contain",
                position: "absolute",
                opacity: 0.4,
                zIndex: 1,
              }}></img>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default function Home() {
  localStorage.removeItem("searchInput");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productsOnSale, setProductsOnSale] = useState([]);
  const { user } = useAppContext();
  useEffect(() => {
    const loadData = async () => {
      try {
        const [recommendedProduct, discount] = await Promise.all([
          user.userId ? Api.recommendation({ customer_id: user.userId }) : Api.getRandomProducts(),
          Api.discount(),
        ]);
        setRecommendedProducts(recommendedProduct);
        setProductsOnSale(discount);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection={"column"} px={2} pb={10}>
      <Banner />
      <Box py={2}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Recommended Products
        </Typography>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {recommendedProducts.map((item, key) => {
          return (
            <Grid display="contents" item xs={2} sm={4} md={4} key={key} height={"400px"}>
              <ProductCard
                type={"recommendedProduct"}
                imageUrl={item.imgURL}
                price={item.price}
                description={""}
                productName={item.title}
                productId={item.asin}
              />
            </Grid>
          );
        })}
      </Box>
      <Box height="30px"></Box>
      <Box py={2}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Products on Sale
        </Typography>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {productsOnSale.map((item, key) => {
          return (
            <Grid display="content" item xs={2} sm={4} md={4} key={key} height={"400px"}>
              <ProductCard
                type={item.discount > 0 ? "productOnSale" : ""}
                imageUrl={item.imgURL}
                price={item.price - item.discount}
                description={item.description}
                productName={item.title}
                productId={item.productID}
                originalPrice={item.price}
              />
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
