import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const url = "/api/products";

const Airtable = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(url);

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="section section-center">
      <div className="title">
        <h2>products</h2>
        <div className="title-underline"></div>
      </div>
      <div className="products">
        {!products && <p>Loading...</p>}
        {products.map((product) => {
          const { id = "", url = "", price = "", name = "" } = product;
          return (
            <Link to={`/${id}`} className="product" key={id}>
              <img src={url} alt={name} />
              <div className="info">
                <h5>{name}</h5>
                <p className="price">${price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Airtable;
