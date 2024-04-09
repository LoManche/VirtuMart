import ProductCard from "../components/productCard";
import Carousel2 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ProductCarousel({ Products }) {
  return (
    <Carousel2
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable={false}
      focusOnSelect={false}
      infinite
      itemClass="padding: 5px"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
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
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={3}
      swipeable>
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
