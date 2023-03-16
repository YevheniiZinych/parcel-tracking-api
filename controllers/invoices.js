const axios = require("axios");
const { Invoice } = require("../model");

const { ctrlWrapper, HttpError } = require("../helpers");

require("dotenv").config();

const { BASE_URL, API_KEY } = process.env;

const getInvoiceNumber = async (req, res) => {
  const { number } = req.body;

  const invoiceData = await Invoice.find({
    number,
  });

  console.log(invoiceData);

  if (invoiceData.length === 0) {
    const options = {
      apiKey: API_KEY,
      modelName: "TrackingDocument",
      calledMethod: "getStatusDocuments",
      methodProperties: {
        Documents: [
          {
            DocumentNumber: number,
          },
        ],
      },
    };

    const { data } = await axios.post(BASE_URL, options);

    if (!data) {
      throw HttpError(404, "Not Found");
    }

    const { WarehouseRecipient, WarehouseSender, Status } = data.data[0];

    let product = new Invoice({
      WarehouseRecipient,
      WarehouseSender,
      Status,
      number,
    });

    await Invoice.create(product);

    return res
      .status(200)
      .json({ WarehouseRecipient, WarehouseSender, Status, number });
  }

  return res.status(200).json(invoiceData);
};

module.exports = { getInvoiceNumber: ctrlWrapper(getInvoiceNumber) };
