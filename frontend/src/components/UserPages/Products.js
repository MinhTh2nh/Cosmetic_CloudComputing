import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../Users.css";
import ProductDetailModal from "./ProductDetailModal";
import Loader from "./Loader";
import Pic404 from "../../assets/404.png";

import { getDataProduct, addItemToCart } from "../../actionCreators/UserAction";
import { useDispatch } from "react-redux";

const Products = (props) => {
  const urlLocalhost = `${process.env.REACT_APP_API_URL}`;
  const dispatch = useDispatch();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dataProduct, setDataProduct] = useState({});
  const [limit, setLimit] = useState(5);

  const unDisplayDetailModal = (boolean) => {
    setShowDetailModal(boolean);
  };

  const inputCart = (data) => {
    dispatch(addItemToCart(data));
  };
  const showDetail = (data) => {
    setDataProduct(data);
    setShowDetailModal(true);
  };
  const picture = (image) => {
    return {
      backgroundImage: `url(${urlLocalhost}/${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginTop: "1rem",
      height: "14rem",
    };
  };

  useEffect(() => {
    dispatch(getDataProduct());
  }, [dispatch]);

  var start = 0;
  var arrayDataProduct = Array.from(props.dataProduct).slice(start, limit);

  // search function
  if (props.submitSearch) {
    var filteredDataProduct = [];
    filteredDataProduct = props.dataProduct.filter((item) => {
      var nameLowercase = item.name.toLowerCase();
      var searchInputLowercase = props.searchInput.toLowerCase();

      if (nameLowercase.includes(searchInputLowercase)) {
        return item;
      } else {
        return false;
      }
    });
    arrayDataProduct = filteredDataProduct;
  }

  const seeMoreFunction = () => {
    setLimit(limit + 3);
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlLocalhost}/product/get`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Karla,sans-serif",
      }}
    >
       <div className="row">
      {products.map((product) => (
        <div key={product.productid.S} className="col-md-4 mt-4">
          <div className="card">
            <div className="product-showdetail">
              <div className="card-img-top">
                <img
                  src={product.image.S}
                  className="card-img-top"
                  alt={product.name.S}
                />
                <h3 className="text-success-s2 font-weight-bold">SEE DETAIL</h3>
              </div>
              <div className="card-body">
                <p className="font-weight-bold my-0">{product.name.S}</p>
                <small className="card-text text-secondary">
                  Stock: {product.quantity.N}
                </small>
                <br />
                <div className="d-flex d-row mt-4">
                  <p className="my-0 text-success-s2 font-weight-bold">
                    ${product.price.N}
                  </p>
                  <button className="btn btn-outline-success d-flex d-row ml-auto">
                    <i className="fas fa-cart-plus align-self-center mr-2 fa-sm" />
                    <small className="font-weight-bold">Cart</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      <ProductDetailModal
        showDetailModal={showDetailModal}
        unDisplayDetailModal={unDisplayDetailModal}
        dataProduct={dataProduct}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataProduct: state.UserReducer.dataProduct,
    dataCart: state.UserReducer.dataCart,
    isProductLoading: state.UserReducer.isProductLoading,
  };
};

export default connect(mapStateToProps)(Products);
