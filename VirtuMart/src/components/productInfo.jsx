import { TextField, Button } from "@mui/material";
import SnackbarButton from "./snackBar";

//display product image 
function ProductImage({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      style={{ maxHeight: "25px" }}
    />
  );
}
//display product name
function ProductName({ title }) {
  return (
    <h1>
      {title}
    </h1>
  );
}
//display product rating
function ProductRating({ rating }) {
  return (
    <div>
      {rating} / 5
    </div>
  );
}
//display product price
function ProductPrice({ price }) {
  return <div>${price}</div>;
}
//display product description
function ProductDescription({ description }) {
  return (
    <p>
      {description}
    </p>
  );
}
//textbox to input product quantity
function ProductQuantity() {
  return (
    <div>
      <TextField style={{ width: "40px", margin: "5px" }} defaultValue="1" size="small" />
    </div>
  );
}
//display  product stock status
function ProductStock() {
  return (
    <div>
      <p style={{ color: "#06B122" }}>In Stock</p>
    </div>
  );
}
//add to cart button, when pressed, notification will pop
function AddToCartButton() {
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
      alert={"Successfully Added"}></SnackbarButton>
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

  return (
    <article className="flex flex-col justify-center text-xl font-medium leading-8 max-w-[515px] text-zinc-500">
      <ProductName>{productData.title}</ProductName>
      <ProductImage src={productData.imageSrc} alt={productData.imageAlt} />
      <ProductRating rating={productData.rating} />
      <ProductPrice price={productData.price} />
      <ProductDescription>{productData.description}</ProductDescription>
      <ProductQuantity />
      <ProductStock />
      <AddToCartButton />
    </article>
  );
}
