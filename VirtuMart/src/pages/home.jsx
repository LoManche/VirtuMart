import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../components/productCard";
import photo from "../assets/homePage.png";
import pear from "../assets/pear.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  var items = [
    {
      name: "VirtuMart",
      price: "",
      productID: 1,
      description: "A shopping website dedicated to providing convenience to you. ",
      src: photo,
    },
    {
      name: "Title",
      price: "",
      productID: 1,
      description: "Description",
      src: pear,
    },
  ];

  return (
    <Box display="flex" width="100%">
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
  const recommendedProducts = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      price: "$10",
      productID: 1,
      description: "@bkristastucchio",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      price: "$100",
      productID: 1,
      description: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      price: "$1200",
      productID: 1,
      description: "@helloimnik",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      price: "$50",
      productID: 1,
      description: "@nolanissac",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      price: "$200",
      productID: 1,
      description: "@hjrc33",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      price: "$100",
      productID: 1,
      description: "@arwinneil",
    },
  ];

  const productsOnSale = [
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      price: "$70",
      originalPrice: "$100",
      productID: 1,
      description: "@tjdragotta",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      price: "$50",
      productID: 1,
      description: "@katie_wasserman",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      price: "$10",
      productID: 1,
      description: "@silverdalex",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      price: "$15",
      productID: 1,
      description: "@shelleypauls",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      price: "$30",
      productID: 1,
      description: "@peterlaster",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      price: "$500",
      productID: 1,
      description: "@southside_customs",
    },
  ];

  return (
    <Box display="flex" flexDirection={"column"} mx={2}>
      <Banner />
      <Box py={2}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Recommended Products
        </Typography>
      </Box>
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recommendedProducts.map((item, key) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={key}>
              <ProductCard
                type={"recommendedProduct"}
                imageUrl={item.img}
                price={item.price}
                description={item.description}
                productName={item.title}
                productId={item.productID}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box height="30px"></Box>
      <Box py={2}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Products on Sale
        </Typography>
      </Box>
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        {productsOnSale.map((item, key) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={key}>
              <ProductCard
                type={"productOnSale"}
                imageUrl={item.img}
                price={item.price}
                description={item.description}
                productName={item.title}
                productId={item.productID}
                originalPrice={item.originalPrice}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
