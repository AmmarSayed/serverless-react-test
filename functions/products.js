require("dotenv").config();

const Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.BASE).table("products");

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  // getting one specific product
  if (id) {
    try {
      const data = await airtable.retrieve(id);
      if (data.error) return { statusCode: 404, body: `No product with id: ${id}` };
      const { url } = data.fields.image[0];
      const { price, description, name } = data.fields;
      return {
        statusCode: 200,
        //always return a string
        body: JSON.stringify({ id, url, price, description, name }),
      };
    } catch (error) {
      return { statusCode: 500, body: "Enternal Server error!" };
    }
  }
  ////////////////////////
  /// else, get all products
  ////////////////////////
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id = "null" } = product;
      const { image = "", price = "0", description = "null", name = "" } = product?.fields;
      const url = image[0].url;
      return { id, name, url, price, description };
    });

    return {
      statusCode: 200,
      //always return a string
      body: JSON.stringify(products),
    };
  } catch (error) {
    return { statusCode: 500, body: "Enternal Server error!" };
  }
};
