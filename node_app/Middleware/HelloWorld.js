// Export Middleware Function
module.exports = (req, res, next) => {

  // Attach Phrase Key Value to the Locals Object to return that value to the Client
  res.locals.phrase = "Hello World";

  // Invoke Next() to move to the next Middleware Function.
  // Also add return to prevent the Middleware from being called twice
  return next();
};

// All the desired functionality for this middleware
// function should live inside the exported arrow function above ^^^^^^^^