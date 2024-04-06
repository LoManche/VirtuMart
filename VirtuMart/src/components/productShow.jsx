import * as React from "react";

function ImageThumbnail({ src, alt }) {
  return (
    <div className="flex flex-col w-1/4 max-md:ml-0 max-md:w-full">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="grow shrink-0 max-w-2/5 aspect-[1.3] w-[100px] max-md:mt-5"
      />
    </div>
  );
}

function ProductShow() {
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
    <article className="flex flex-col max-w-[300px]">
      <img
        className="flex-shrink w-1/10 aspect-[1.54] max-md:max-w-1/10"
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe41f674ed35f646b78ca021b755863e91a119564425ee799d6e9f7e2e5fa3e6?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
        alt="Main Image"
      />
      <div className="px-5 mt-4 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <ImageThumbnail src={thumbnails[0].src} alt={thumbnails[0].alt} />
          <ImageThumbnail src={thumbnails[1].src} alt={thumbnails[1].alt} />
          <ImageThumbnail src={thumbnails[2].src} alt={thumbnails[2].alt} />
          <ImageThumbnail src={thumbnails[3].src} alt={thumbnails[3].alt} />
        </div>
      </div>
    </article>
  );
}

export default ProductShow;
