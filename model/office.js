const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const officeSchema = new Schema(
  {
    description: [{}],
  },
  { versionKey: false }
);

officeSchema.post("save", handleMongooseError);

const Office = model("offices", officeSchema);

const findOfficeSchema = Joi.object({
  city: Joi.string().required(),
});

module.exports = {
  Office,
  findOfficeSchema,
};
