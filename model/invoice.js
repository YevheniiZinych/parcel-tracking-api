const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const invoiceSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    WarehouseRecipient: {
      type: String,
      required: true,
    },
    WarehouseSender: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

invoiceSchema.post("save", handleMongooseError);

const Invoice = model("invoice", invoiceSchema);

const invoiceJoiSchema = Joi.object({
  number: Joi.string().min(14).max(14).required(),
});

module.exports = {
  Invoice,
  invoiceJoiSchema,
};
