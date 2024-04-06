import ProductDetails from "../components/productInfo";
import ProductShow from "../components/productShow";

export default function Product() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "500px", height: "100px" }}>
        <ProductShow></ProductShow>
      </div>
      <div>
        <ProductDetails></ProductDetails>
      </div>
    </div>
  );
}
