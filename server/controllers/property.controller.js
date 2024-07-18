import Property from "../models/property.model.js";

export const createProperty = async (req, res, next) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};
