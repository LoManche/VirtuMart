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
    // {
    //   name: "Title",
    //   price: "",
    //   productID: 1,
    //   description: "Description",
    //   src: pear,
    // },
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
  // const recommendedProducts = [
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  //     title: "Breakfast",
  //     price: "$10",
  //     productID: 1,
  //     description: "@bkristastucchio",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  //     title: "Burger",
  //     price: "$100",
  //     productID: 1,
  //     description: "@rollelflex_graphy726",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  //     title: "Camera",
  //     price: "$1200",
  //     productID: 1,
  //     description: "@helloimnik",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  //     title: "Coffee",
  //     price: "$50",
  //     productID: 1,
  //     description: "@nolanissac",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  //     title: "Hats",
  //     price: "$200",
  //     productID: 1,
  //     description: "@hjrc33",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
  //     title: "Honey",
  //     price: "$100",
  //     productID: 1,
  //     description: "@arwinneil",
  //   },
  // ];

  // const productsOnSale = [
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
  //     title: "Basketball",
  //     discount: "$30",
  //     price: "$100",
  //     productID: 1,
  //     description: "@tjdragotta",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  //     title: "Fern",
  //     price: "$50",
  //     productID: 1,
  //     description: "@katie_wasserman",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //     title: "Mushrooms",
  //     price: "$10",
  //     productID: 1,
  //     description: "@silverdalex",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //     title: "Tomato basil",
  //     price: "$15",
  //     productID: 1,
  //     description: "@shelleypauls",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //     title: "Sea star",
  //     price: "$30",
  //     productID: 1,
  //     description: "@peterlaster",
  //   },
  //   {
  //     imgURL: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //     title: "Bike",
  //     price: "$500",
  //     productID: 1,
  //     description: "@southside_customs",
  //   },
  // ];

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
        //const recommendedProduct = user? await Api.recommendation({customer_id: user.userId }): await Api.getRandomProducts();

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
      {/* <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}> */}
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
