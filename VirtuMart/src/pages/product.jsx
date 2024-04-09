import ProductDetails from "../components/productInfo";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCarousel from "../components/productCarousel";
import { TextField } from "@mui/material";

function ProductShow({ thumbnails }) {
  return (
    <Carousel showArrows={true} autoplay={true} infiniteLoop={true}>
      <div>
        <img src={thumbnails[0].src} alt={thumbnails[0].alt} />
      </div>
      <div>
        <img src={thumbnails[1].src} alt={thumbnails[1].alt} />
      </div>
      <div>
        <img src={thumbnails[2].src} alt={thumbnails[2].alt} />
      </div>
      <div>
        <img src={thumbnails[3].src} alt={thumbnails[3].alt} />
      </div>
      {/*
      {thumbnails.map((item, index) => (
        <div>
          <img src={item[index].src} alt={item[index].alt} />
        </div>
      ))}
    */}
    </Carousel>
  );
}

function StarRating({ rating, label }) {
  return (
    <div className="flex gap-5 px-5 mt-3.5 w-full max-md:flex-wrap max-md:max-w-full">
      <div className="grow my-auto text-2xl leading-9 text-black">{label}</div>
      <div className="flex flex-col grow shrink-0 justify-center items-start basis-0 bg-zinc-300 w-fit max-md:max-w-full">
        <div className={`shrink-0 bg-orange-400 h-[39px] w-[${rating * 20}%]`} />
      </div>
    </div>
  );
}

function Ratings() {
  const ratings = [
    { rating: 5, label: "5 star" },
    { rating: 4, label: "4 star" },
    { rating: 3, label: "3 star" },
    { rating: 2, label: "2 star" },
    { rating: 1, label: "1 star" },
  ];

  return (
    <section className="flex flex-col max-w-[561px]">
      <h2 className="w-full text-2xl leading-9 text-black max-md:max-w-full">Ratings</h2>
      {ratings.map((item) => (
        <StarRating key={item.rating} rating={item.rating} label={item.label} />
      ))}
    </section>
  );
}

function SubmitButton() {
  return (
    <div
      style={{ display: "flex" }}
      className="flex gap-0 justify-center mt-2 text-black whitespace-nowrap">
      <img
        style={{ maxWidth: "30px", marginRight: "10px" }}
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ceb61dcb7806c77ba41c36a7a4b20a5e1adf8a3d8aab7530f5d8fb110b3a1223?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
        alt="Submit icon"
        className="shrink-0 aspect-[1.41] w-[42px]"
      />
      <div className="justify-center px-2.5 py-1 rounded-lg bg-black bg-opacity-10">Submit</div>
    </div>
  );
}

function Review() {
  return (
    <div className="flex flex-col items-start text-base font-medium leading-6 max-w-[626px]">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d4f202be17199b06718a9abed5cfe11b0709fa2cf3ed64b1609df3e38af69e7?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
        alt="Product image"
        className="w-56 max-w-full aspect-[6.67] fill-zinc-300"
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

function Avatar({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="shrink-0 aspect-square w-[70px]"
      style={{ maxHeight: "60px" }}
    />
  );
}

function UserIcon({ name, reviewDate }) {
  return (
    <div className="flex flex-col grow shrink-0 px-5 mt-2.5 basis-0 w-fit">
      <div className="flex gap-5 text-2xl">
        <div className="grow my-auto">{name}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d4f202be17199b06718a9abed5cfe11b0709fa2cf3ed64b1609df3e38af69e7?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
          alt=""
          className="w-56 aspect-[6.67] fill-zinc-300"
          style={{ maxHeight: "20px" }}
        />
      </div>
      <div className="mt-5 text-lg">{reviewDate}</div>
    </div>
  );
}

function CommentInfo({ avatar, name, reviewDate, reviewText }) {
  return (
    <article className="flex flex-col text-black">
      <header
        className="flex gap-5 items-start self-start leading-[150%] max-md:flex-wrap"
        style={{ display: "flex" }}>
        <Avatar src={avatar} alt={`${name}'s avatar`} />
        <UserIcon name={name} reviewDate={reviewDate} />
      </header>
      <p className="mt-6 w-full text-2xl leading-9 max-md:max-w-full">{reviewText}</p>
    </article>
  );
}

function Comments() {
  const reviews = [
    {
      id: 1,
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6fc6a0e455ce7e42e40157a69ccda3ee0b5a7106b18f3c409410d2ef5a389eb1?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
      name: "User name",
      reviewDate: "Reviewed on 28th March, 2024",
      reviewText:
        "Some comments about how good or bad the product is!!!! Some comments about how good or bad the product is!!!!Some comments about how good or bad the product is!!!!Some comments about how good or bad the product is!!!!Some comments about how good or bad the product is!!!!Some comments about how good or bad the product is!!!!Some comments about how good or bad the product is!!!!",
    },
    {
      id: 2,
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6fc6a0e455ce7e42e40157a69ccda3ee0b5a7106b18f3c409410d2ef5a389eb1?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
      name: "Another User",
      reviewDate: "Reviewed on 29th March, 2024",
      reviewText:
        "Different comments about the product. Different comments about the product. Different comments about the product. Different comments about the product.",
    },
  ];

  return (
    <section>
      {reviews.map((review) => (
        <CommentInfo
          key={review.id}
          avatar={review.avatar}
          name={review.name}
          reviewDate={review.reviewDate}
          reviewText={review.reviewText}
        />
      ))}
    </section>
  );
}

export default function Product() {
  const thumbnails = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fe41f674ed35f646b78ca021b755863e91a119564425ee799d6e9f7e2e5fa3e6?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
      alt: "Thumbnail 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/61e2caebbac60173c56ab6870677863e2f513976fe9049844baef3473d93064d?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
      alt: "Thumbnail 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8496a77b109dc5df028507ef3efeb1328de198d0da4625c744d970765dc1d3c3?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
      alt: "Thumbnail 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fedcdbd43dbee31cf010d2ccb5afc3f81ca5210a3f4e4a24ef7dd42b9bbbf215?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
      alt: "Thumbnail 4",
    },
  ];

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
      productID: 2,
      description: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      price: "$1200",
      productID: 3,
      description: "@helloimnik",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      price: "$50",
      productID: 4,
      description: "@nolanissac",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      price: "$200",
      productID: 5,
      description: "@hjrc33",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      price: "$100",
      productID: 6,
      description: "@arwinneil",
    },
  ];

  const popularProducts = [
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
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "0 70px 10px 50px", width: "500px" }}>
          <ProductShow thumbnails={thumbnails}></ProductShow>
        </div>
        <div style={{ margin: "0 50px 10px 70px" }}>
          <ProductDetails></ProductDetails>
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
        <Comments></Comments>
      </div>
    </div>
  );
}