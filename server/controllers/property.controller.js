import Property from "../models/property.model.js";
import { errorHandler } from "../utils/error.js";

export const createProperty = async (req, res, next) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(errorHandler(404, "Property not found!"));
  }

  if (req.user.id !== property.userRef) {
    return next(errorHandler(401, "You only can delete your own property!"));
  }

  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(errorHandler(404, "Property not found!"));
  }

  if (req.user.id !== property.userRef) {
    return next(errorHandler(401, "You only can update your own property!"));
  }

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
};

export const getTheProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const getAllProperties = async (req, res, next) => {
  try {
    const furnished =
      req.query.furnished === "true"
        ? true
        : req.query.furnished === "false"
        ? false
        : { $in: [false, true] };
    const parking =
      req.query.parking === "true"
        ? true
        : req.query.parking === "false"
        ? false
        : { $in: [false, true] };
    const type =
      req.query.type && req.query.type !== "all"
        ? req.query.type
        : { $in: ["sale", "rent"] };
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const properties = await Property.find({
      name: { $regex: searchTerm, $options: "i" },
      furnished,
      parking,
      type,
    }).sort({ [sort]: order });

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};
