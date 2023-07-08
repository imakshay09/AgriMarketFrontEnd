import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
const Products = () => {
  const [products, setProducts] = useState([]);
  const API_URL = "http://localhost:8080/api/v1/product";

  
  //to get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/get-products`);
      setProducts(data.products);
      console.log("All Products", data.products);
      toast.success("All Products are loaded");
    } catch (error) {
      console.log("Error in getting all products", error);
      toast.error("Error in getting all products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Products">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products.map((product) => (
                <Link to={`/dashboard/admin/update-product/${product.slug}`} key={product._id} className="product-link">
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;