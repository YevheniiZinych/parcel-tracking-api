const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const officeSchema = new Schema(
  {
    city: {
      type: String,
      required: [true, "City name is required"],
    },
    office: {
      type: String,
      required: [true],
    },
    number: {
      type: String,
      required: [true],
    },
  },
  { versionKey: false }
);

officeSchema.post("save", handleMongooseError);

const Office = model("office", officeSchema);

const findOfficeSchema = Joi.object({
  city: Joi.string().required(),
  office: Joi.string().required(),
  number: Joi.string().required(),
});

module.exports = {
  Office,
  findOfficeSchema,
};
