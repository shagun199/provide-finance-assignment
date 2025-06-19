import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import Cart from "./Cart";

import { connect } from "react-redux";
import { addItem, Product } from "./redux/store/slices/basketSlice";
import { RootState } from "./redux/store/store";

type ProductListState = {
  products: Product[];
};

interface ReduxStateProps {
  basketItems: Product[];
}

interface ReduxDispatchProps {
  addItem: (product: Product) => void;
}

type Props = ReduxStateProps & ReduxDispatchProps;

class ProductList extends React.Component<Props, ProductListState> {
  state: ProductListState = {
    products: [],
  };

  componentDidMount() {
    axios.get("https://dummyjson.com/products?limit=20&skip=20").then((res) => {
      const products: Product[] = res.data.products;
      this.setState({ products });
    });
  }

  addToCart = (product: Product) => {
    const newProduct = { ...product, quantity: 1 };
    this.props.addItem(newProduct);
  };

  render() {
    const { basketItems } = this.props;

    return (
      <div>
        <Cart products={basketItems} />
        <Divider />
        <h1>Products</h1>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {this.state.products.map((product) => (
            <Grid key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => this.addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  basketItems: state.basket.products,
});

const mapDispatchToProps: ReduxDispatchProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
