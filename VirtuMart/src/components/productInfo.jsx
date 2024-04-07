import * as React from "react";

function ProductImage({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="mt-6 w-56 max-w-full aspect-[6.67] fill-zinc-300"
    />
  );
}

function ProductName({ children }) {
  return (
    <h1 className="w-full text-4xl font-semibold leading-10 text-black max-md:max-w-full">
      {children}
    </h1>
  );
}

function ProductRating({ rating }) {
  return <div className="mt-6 w-full max-md:max-w-full">{rating} ratings</div>;
}

function ProductPrice({ price }) {
  return <div className="mt-6 w-full text-2xl text-black max-md:max-w-full">{price}</div>;
}

function ProductDescription({ children }) {
  return <p className="mt-6 w-full leading-8 max-md:max-w-full">{children}</p>;
}

function ProductQuantity() {
  return (
    <div className="self-start px-4 pt-3 pb-1 mt-6 text-base whitespace-nowrap bg-white rounded-lg border border-solid shadow-sm border-neutral-200">
      1
    </div>
  );
}

function ProductOptions() {
  return (
    <div className="flex gap-4 self-start px-4 py-2 mt-6 text-base whitespace-nowrap bg-white rounded-lg border border-solid border-neutral-200">
      <div className="flex-1 text-ellipsis">Options</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/85e18d04d9f46d6370657b346cee40949684ff12a82653f121db3f4367db9e5a?apiKey=64e0584885e94e77ae2d2a5ac36293f7&"
        alt=""
        className="shrink-0 w-6 aspect-square"
      />
    </div>
  );
}

function ProductStock() {
  return <div className="mt-6 w-full text-green-600 max-md:max-w-full">In Stock</div>;
}

function AddToCartButton() {
  return (
    <button className="justify-center items-center px-6 py-3.5 mt-6 w-full text-base text-white bg-black rounded-lg shadow-sm max-md:px-5 max-md:max-w-full">
      Add to cart
    </button>
  );
}

export default function ProductDetails() {
  const productData = {
    name: "Product name",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/301726b3416db59c21f66be75d5ff84a9608da6d86a48c2514f32adbadeb1332?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
    imageAlt: "Product image",
    rating: "1,361",
    price: "$10.99",
    description: "Body text for describing why this product is simply a must-buy",
  };

  return (
    <article className="flex flex-col justify-center text-xl font-medium leading-8 max-w-[515px] text-zinc-500">
      <ProductName>{productData.name}</ProductName>
      <ProductImage src={productData.imageSrc} alt={productData.imageAlt} />
      <ProductRating rating={productData.rating} />
      <ProductPrice price={productData.price} />
      <ProductDescription>{productData.description}</ProductDescription>
      <ProductQuantity />
      <ProductOptions />
      <ProductStock />
      <AddToCartButton />
    </article>
  );
}
