import { useEffect, useState } from "react";
import Api from "../api";
import handleError from "../components/handleError";
import {
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ProductCard from "../components/productCard";

export default function SearchResult() {
  const searchInput = localStorage.getItem("searchInput");
  const [searchResult, setSearchResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    title: searchInput,
    category: null,
    minPrice: 0,
    maxPrice: 100000,
    stock: null,
  });
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [calculatedRange, setCalculatedRange] = useState([0, 100000000]);
  const [reloadFlag, setReloadFlag] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      const { title, category, minPrice, maxPrice, stock } = filter;
      try {
        const [searchResult, categories] = await Promise.all([
          Api.search({ title, category, minPrice, maxPrice, stock }),
          Api.allCategory(),
        ]);

        setSearchResult(searchResult);
        setCategories(categories);
        let minPriceCal = searchResult[0].price;
        let maxPriceCal = searchResult[0].price;

        // Iterate over the products to find the minimum and maximum prices
        for (let i = 1; i < searchResult.length; i++) {
          const price = searchResult[i].price;
          if (price < minPriceCal) {
            minPriceCal = price;
          }
          if (price > maxPriceCal) {
            maxPriceCal = price;
          }
        }
        setCalculatedRange([minPriceCal, maxPriceCal]);
        setFilter({ ...filter, minPrice: minPriceCal, maxPrice: maxPriceCal });
        console.log(searchInput, filter, searchResult);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadFlag]);

  const handlePriceRangeChange = (event, newValue) => {
    setFilter({ ...filter, minPrice: newValue[0], maxPrice: newValue[1] });
    // setFilter(newValue);
  };
  const handleStockChange = (e) => {
    setFilter({ ...filter, stock: e.target.checked });
  };

  const onSubmit = (e) => {
    setReloadFlag(Math.random());
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box width={"30%"} borderRight={1} borderColor={"lightgray"}>
          <List>
            <ListItem>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => {
                  setFilter({
                    title: searchInput,
                    category: null,
                    minPrice: 0,
                    maxPrice: 100000,
                    stock: null,
                  });
                  onSubmit(e);
                }}>
                Reset
              </Button>
            </ListItem>
            <ListItem>
              <ListItemText>Category</ListItemText>
            </ListItem>

            {categories.map((category, key) => {
              return (
                <ListItemButton
                  sx={{ pl: 6 }}
                  selected={selectedIndex === key}
                  key={key}
                  onClick={(e) => {
                    if (selectedIndex === key) {
                      setSelectedIndex(undefined);
                      //   setFilter({ ...filter, category_id: null });
                    } else {
                      setSelectedIndex(key);
                      //   setFilter({ ...filter, category: category.category_id });
                    }
                  }}>
                  {category.category_name}
                </ListItemButton>
              );
            })}

            <ListItem>
              <ListItemText>Price Range</ListItemText>{" "}
            </ListItem>
            <ListItem>
              <Slider
                value={[filter.minPrice, filter.maxPrice]}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={calculatedRange[0]}
                max={calculatedRange[1]}
              />
            </ListItem>
            <ListItem>Stock</ListItem>
            <ListItem>
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={<Checkbox checked={filter.stock} onChange={handleStockChange} />}
                  label="Show only in stock"
                />
              </Box>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => {
                  onSubmit(e);
                }}>
                Filter
              </Button>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ flexGrow: 1, p: 2, pl: 3 }} flexDirection={"column"}>
          <Typography variant="h4">Result</Typography>
          {searchResult.length === 0 ? (
            <Box height={600} display={"flex"} justifyContent="center" alignItems={"center"}>
              <Typography variant="h4">No Matching Result</Typography>
            </Box>
          ) : (
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              {searchResult.map((item, key) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={key} height={"400px"}>
                    <ProductCard
                      type={item.discount > 0 ? "productOnSale" : ""}
                      imageUrl={item.imgURL}
                      price={item.price - item.discount}
                      description={item.description}
                      productName={item.title}
                      productId={item.productID}
                      originalPrice={item.price}
                    />
                  </Grid>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
