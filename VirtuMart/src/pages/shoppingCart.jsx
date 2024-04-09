import { Carousel } from "react-responsive-carousel";

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

export default function ShoppingCart() {
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
      <ProductShow thumbnails={thumbnails}></ProductShow>
    </div>
  );
}
