const { Office } = require("../model");
const axios = require("axios");

const { ctrlWrapper, HttpError } = require("../helpers");

require("dotenv").config();

const { BASE_URL, API_KEY } = process.env;

const getAllOffices = async (req, res) => {
  const { city } = req.body;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const offices = await Office.find(
    { description: { $elemMatch: { CityDescription: city } } },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );

  if (offices.length === 0) {
    const { data } = await axios.post(BASE_URL, {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: city,
        Page: `${page}`,
        Limit: `${limit}`,
        Language: "UA",
      },
    });

    if (!data) {
      throw HttpError(404, "Not Found");
    }

    const descriptions = data.data.map(
      ({ Description, Number, Reception, CityDescription }) => {
        return { Description, Number, CityDescription, Reception };
      }
    );

    for (const description of descriptions) {
      let product = new Office({
        description,
      });
      await Office.create(product);
    }

    return res.json(descriptions);
  }

  return res.json(offices);
};

module.exports = { getAllOffices: ctrlWrapper(getAllOffices) };
