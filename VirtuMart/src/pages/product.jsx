import ProductDetails from "../components/productInfo";
import ProductCard from "../components/productCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    </Carousel>
  );
}

function RecommendedProducts() {
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

  return (
    <Carousel showArrows={true}>
      <div>
        <ProductCard
          type={"recommendedProduct"}
          imageUrl={item.img}
          price={item.price}
          description={item.description}
          productName={item.title}
          productId={item.productID}
        />
      </div>
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
      <h2 className="w-full text-2xl leading-9 text-black max-md:max-w-full">Reviews</h2>
      {ratings.map((item) => (
        <StarRating key={item.rating} rating={item.rating} label={item.label} />
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "50px", width: "500px" }}>
          <ProductShow thumbnails={thumbnails}></ProductShow>
        </div>
        <div style={{ margin: "50px" }}>
          <ProductDetails></ProductDetails>
        </div>
      </div>

      <div></div>

      <div>
        <Ratings></Ratings>
      </div>
    </div>
  );
}
