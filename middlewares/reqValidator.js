const reqValidator = (req, res, next) => {
  const { sender, subject, name, message } = req.body;
  const validationObj = {
    from: "",
    subject: "",
    name: "",
    message: "",
  };

  !sender.match(/^([A-Za-z0-9\.]+)(@{1}[A-Za-z0-9\.]+)$/m)
    ? (validationObj.from = "field needs a valid email address")
    : (validationObj.from = undefined);

  !name.match(/[A-Za-z]{2,}/g)
    ? (validationObj.name = "field needs your name")
    : (validationObj.name = undefined);

  !subject.match(/[A-Za-z0-9]{2,}/g)
    ? (validationObj.subject = "field needs to include 2 characters or more")
    : (validationObj.subject = undefined);

  !message.match(/[A-Za-z0-9\s]{5,}/g)
    ? (validationObj.message = "field needs to include a sentence")
    : (validationObj.message = undefined);

  const errorValues = Object.values(validationObj);
  const errorsDoNotExist = errorValues.every((value) => value === undefined);

  errorsDoNotExist ? next() : res.status(400).send({ errors: validationObj });
};

module.exports = reqValidator;
