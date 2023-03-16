const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const invoiceSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

invoiceSchema.post("save", handleMongooseError);

const Invoice = model("invoice", invoiceSchema);

const invoiceJoiSchema = Joi.object({
  number: Joi.string().required(),
});

module.exports = {
  Invoice,
  invoiceJoiSchema,
};
