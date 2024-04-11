import ProductDetails from "../components/productInfo";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCarousel from "../components/productCarousel";
import { TextField, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import Api from "../api";
import handleError from "../components/handleError";
import { useParams } from "react-router-dom";

function HorizontalBars(ratings) {
  return (
    <BarChart
      yAxis={[
        {
          id: "barCategories",
          data: ["5 star", "4 star", "3 star", "2 star", "1 star"],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [80, 20, 10, 5, 1],
        },
      ]}
      width={500}
      height={300}
      layout="horizontal"
    />
  );
}

function Ratings() {
  const ratings = [80, 20, 10, 5, 1];

  return (
    <div>
      <h2 className="w-full text-2xl leading-9 text-black max-md:max-w-full">Ratings</h2>
      <HorizontalBars ratings={ratings}></HorizontalBars>
    </div>
  );
}

function SubmitButton() {
  return (
    <Button
      style={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "8px",
        width: "70px",
        height: "30px",
      }}>
      Submit
    </Button>
  );
}

function Review() {
  return (
    <div style={{ marginTop: "30px" }}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d4f202be17199b06718a9abed5cfe11b0709fa2cf3ed64b1609df3e38af69e7?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
        alt="Product image"
        style={{ maxHeight: "27px" }}
      />
      <div style={{ width: "500px", marginBottom: "10px" }}>
        <TextField
          id="outlined-basic"
          label="How did you like the product?"
          multiline
          minRows={5}
          fullWidth
        />
      </div>
      <SubmitButton />
    </div>
  );
}

function CommentInfo({ name, reviewDate, reviewText, rating }) {
  return (
    <article className="flex flex-col text-black">
      <header style={{ display: "flex" }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fc6a0e455ce7e42e40157a69ccda3ee0b5a7106b18f3c409410d2ef5a389eb1?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
          alt="image"
          className="shrink-0 aspect-square w-[70px]"
          style={{ maxHeight: "60px" }}
        />
        <div>
          <p>{name}</p>
          <p>Rating: {rating}/5</p>
          <p>{reviewDate}</p>
        </div>
      </header>
      <p>{reviewText}</p>
    </article>
  );
}

function Comments({ reviews }) {
  // let reviews = [
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-09T16:00:00.000Z",
  //     username: "User1",
  //   },
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-10T16:00:00.000Z",
  //     username: "User1",
  //   },
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-10T16:00:00.000Z",
  //     username: "User1",
  //   },
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-10T16:00:00.000Z",
  //     username: "User1",
  //   },
  // ];
  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }
  return (
    <section>
      {reviews.map((review, index) => (
        <CommentInfo
          key={index}
          name={review.username}
          reviewDate={review.dateofReview}
          reviewText={review.review}
          rating={review.rating}
        />
      ))}
    </section>
  );
}

export default function Product() {
  // const reviews = [
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-09T16:00:00.000Z",
  //     username: "User1",
  //   },
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-10T16:00:00.000Z",
  //     username: "User1",
  //   },
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-10T16:00:00.000Z",
  //     username: "User1",
  //   },
  //   {
  //     rating: 5,
  //     review: "Great Stuff!",
  //     dateOfReview: "2024-04-10T16:00:00.000Z",
  //     username: "User1",
  //   },
  // ];
  // const recommendedProducts = [
  //   {
  //     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  //     title: "Breakfast",
  //     price: "$10",
  //     productID: 1,
  //     description: "@bkristastucchio",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  //     title: "Burger",
  //     price: "$100",
  //     productID: 2,
  //     description: "@rollelflex_graphy726",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  //     title: "Camera",
  //     price: "$1200",
  //     productID: 3,
  //     description: "@helloimnik",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  //     title: "Coffee",
  //     price: "$50",
  //     productID: 4,
  //     description: "@nolanissac",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  //     title: "Hats",
  //     price: "$200",
  //     productID: 5,
  //     description: "@hjrc33",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
  //     title: "Honey",
  //     price: "$100",
  //     productID: 6,
  //     description: "@arwinneil",
  //   },
  // ];

  // const popularProducts = [
  //   {
  //     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
  //     title: "Basketball",
  //     price: "$70",
  //     originalPrice: "$100",
  //     productID: 1,
  //     description: "@tjdragotta",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  //     title: "Fern",
  //     price: "$50",
  //     productID: 1,
  //     description: "@katie_wasserman",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //     title: "Mushrooms",
  //     price: "$10",
  //     productID: 1,
  //     description: "@silverdalex",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //     title: "Tomato basil",
  //     price: "$15",
  //     productID: 1,
  //     description: "@shelleypauls",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //     title: "Sea star",
  //     price: "$30",
  //     productID: 1,
  //     description: "@peterlaster",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //     title: "Bike",
  //     price: "$500",
  //     productID: 1,
  //     description: "@southside_customs",
  //   },
  // ];
  const [product, setProduct] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const p_id = useParams()
  useEffect(() => {
    const loadData = async () => {
      try {
        let prodandreviews = await Api.getProductById({ product_id: p_id});
        console.log(prodandreviews)
        setProduct(prodandreviews.product);
        setReviews(prodandreviews.reviews);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (product?.length > 0) {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "0 70px 10px 50px", width: "500px" }}>
            <img src={product[0].imgURL} alt={"image"} style={{ height: "500px" }} />
          </div>
          <div style={{ margin: "0 50px 10px 70px" }}>
            <h1>{product[0].title}</h1>
            <p>Rating: {product[0].rating}/5</p>
            <p>${product[0].price}</p>
            <p>{product[0].description}</p>
            <ProductDetails stock={product[0].stock}></ProductDetails>
          </div>
        </div>

        <div>
          <h2>Recommended Products</h2>
          <ProductCarousel Products={recommendedProducts}></ProductCarousel>
        </div>

        <div>
          <h2>Popular Products</h2>
          <ProductCarousel Products={popularProducts}></ProductCarousel>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ margin: "50px" }}>
            <Ratings></Ratings>
          </div>
          <div style={{ margin: "50px" }}>
            <Review></Review>
          </div>
        </div>
        <div style={{ margin: "50px" }}>
          <Comments reviews={reviews}></Comments>
        </div>
      </div>
    );
  }
  return;
}
