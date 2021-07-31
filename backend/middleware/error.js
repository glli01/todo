export const errorHandler = (error, req, res, next) => {
  if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    return res.status(401).send("invalid token");
  } else {
    console.error(error.name);
    console.error(error.message);
    return res.status(400).json({ name: error.name, message: error.message });
  }
};
