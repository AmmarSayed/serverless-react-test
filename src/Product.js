import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState("");

  const { productID } = useParams();

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/products?id=${productID}`);

      setProduct(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading && (
        <section className="section section-center title">
          <h2>Loading...</h2>
          <div>
            <img src={product.url} alt={product.name} />
          </div>
        </section>
      )}

      {product && (
        <section className="section section-center">
          <Link to="/" className="link">
            Back home
          </Link>
          <div className="title">
            <h2>{product.name}</h2>
            <div className="title-underline"></div>
          </div>
          <article className="single-product">
            <img src={product.url} alt={product.name} className="single-product-img" />
            <div>
              <h5>{product.name}</h5>
              <h5 className="price">${product.price}</h5>
              <p>{product.description}</p>
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default Product;
