import axios from "axios";
import React, { useEffect, useState } from "react";

const url = "";

const tempData = [
  {
    id: "recmg2a1ctaEJNZhu",
    name: "utopia sofa",
    image: {
      url: "https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg",
    },
    price: 39.95,
  },
  {
    id: "recvKMNR3YFw0bEt3",
    name: "entertainment center",
    image: {
      url: "https://dl.airtable.com/.attachments/da5e17fd71f50578d525dd5f596e407e/d5e88ac8/product-2.jpg",
    },
    price: 29.98,
  },
  {
    id: "recxaXFy5IW539sgM",
    name: "albany sectional",
    image: {
      url: "https://dl.airtable.com/.attachments/05ecddf7ac8d581ecc3f7922415e7907/a4242abc/product-1.jpeg",
    },
    price: 10.99,
  },
  {
    id: "recyqtRglGNGtO4Q5",
    name: "leather sofa",
    image: {
      url: "https://dl.airtable.com/.attachments/3245c726ee77d73702ba8c3310639727/f000842b/product-5.jpg",
    },
    price: 9.99,
  },
];

const Basic = () => {
  const [products, setProducts] = useState();

  const fetchData = async () => {
    try {
      //   const { data } = await axios.get(url);
      setProducts(tempData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="section section-center">
      <div className="title">
        <h2>basic setup</h2>
        <div className="title-underline"></div>
      </div>
      <div className="products">
        {!products && <p>Loading...</p>}
        {products &&
          products.map((product) => {
            const {
              id,
              image: { url },
              price,
              name,
            } = product;
            return (
              <article className="product" key={id}>
                <img src={url} alt={name} />
                <div className="info">
                  <h5>{name}</h5>
                  <p className="price">${price}</p>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
};

export default Basic;
