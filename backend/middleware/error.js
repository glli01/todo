export const errorHandler = (error, req, res, next) => {
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid token",
    });
  }
  console.error(error.message);
  next(error);
};
