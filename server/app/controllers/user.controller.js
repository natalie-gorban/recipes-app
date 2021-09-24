exports.publicContent = (req, res) => {
  let message = "Public Content.";
  console.log("publicContent message", message);
  res.status(200).send(message);
};

exports.userContent = (req, res) => {
  let message = "User Content.";
  console.log("userContent message", message);
  res.status(200).send(message);
};
