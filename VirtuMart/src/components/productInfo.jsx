import { TextField, Button } from "@mui/material";
import SnackbarButton from "./snackBar";
import { useAppContext } from "../contexts/appContext";
import { useState } from "react";
import Api from "../api";
import handleError from "./handleError";

import { useNavigate } from "react-router-dom";
function ProductImage({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="mt-6 w-56 max-w-full aspect-[6.67] fill-zinc-300"
      style={{ maxHeight: "25px" }}
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
  return (
    <div className="mt-6 w-full max-md:max-w-full" style={{ color: "#828282" }}>
      {rating} / 5
    </div>
  );
}

function ProductPrice({ price }) {
  return <div className="mt-6 w-full text-2xl text-black max-md:max-w-full">${price}</div>;
}

function ProductDescription({ children }) {
  return (
    <p className="mt-6 w-full leading-8 max-md:max-w-full" style={{ color: "#828282" }}>
      {children}
    </p>
  );
}

function ProductQuantity({ quantity, setQuantity }) {
  return (
    <div>
      <TextField
        style={{ width: "40px", margin: "5px" }}
        value={quantity}
        defaultValue="1"
        size="small"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
    </div>
  );
}

function ProductStock() {
  return (
    <div>
      <p style={{ color: "#06B122" }}>In Stock</p>
    </div>
  );
}

function AddToCartButton({ productData, quantity, Navigate }) {
  const { user } = useAppContext();
  async function onClick(e) {
    e.preventDefault;
    if (user.userId && productData.asin) {
      try {
        const res = await Api.addToCart({
          customer_id: user.userId,
          product_id: productData.asin,
          quantity: quantity,
        });
        console.log(res);
      } catch (err) {
        handleError(err, "");
      }
    } else {
      Navigate("/account");
    }
  }

  return (
    <SnackbarButton
      buttonStyle={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "8px",
        width: "100%",
        height: "50px",
      }}
      msg={"Add to Cart"}
      onClick={(e) => {
        onClick(e);
      }}
      alert={"Successfully Added"}>
      {/* msg={"Add to Cart"}
      alert={"Successfully Added"} */}
    </SnackbarButton>
  );
}

export default function ProductDetails({ productData }) {
  // const productData = {
  //   name: "Product name",
  //   imageSrc:
  //     "https://cdn.builder.io/api/v1/image/assets/TEMP/301726b3416db59c21f66be75d5ff84a9608da6d86a48c2514f32adbadeb1332?apiKey=64e0584885e94e77ae2d2a5ac36293f7&",
  //   imageAlt: "Product image",
  //   rating: "1,361",
  //   price: "$10.99",
  //   description: "Body text for describing why this product is simply a must-buy",
  // };

  const [quantity, setQuantity] = useState(1);
  const Navigate = useNavigate();
  if (Object.keys(productData).length > 0) {
    return (
      <article className="flex flex-col justify-center text-xl font-medium leading-8 max-w-[515px] text-zinc-500">
        <ProductName>{productData.title}</ProductName>
        <ProductImage src={productData.imageSrc} alt={productData.imageAlt} />
        <ProductRating rating={productData.rating} />
        <ProductPrice price={productData.price} />
        <ProductDescription>{productData.description}</ProductDescription>
        <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
        <ProductStock />
        <AddToCartButton productData={productData} quantity={quantity} Navigate={Navigate} />
      </article>
    );
  } else {
    return <></>;
  }
}
