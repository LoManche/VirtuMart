import ProductCard from "../components/productCard";
import Carousel2 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//to show recommended products in carousel
export default function ProductCarousel({ Products }) {
  return (
    <Carousel2
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      containerClass="container-with-dots"
      infinite
      itemClass="padding: 5px"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 4,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      shouldResetAutoplay
      slidesToSlide={3}>//number of slides
      //loop through the products and call ProductCard to display them as grid items
      {Products.map((item, index) => (
        <div key={index} style={{ padding: "3px" }}>
          <ProductCard
            type={"Product"}
            imageUrl={item.img}
            price={item.price}
            description={item.description}
            productName={item.title}
            productId={item.productID}
          />
        </div>
      ))}
    </Carousel2>
  );
}
