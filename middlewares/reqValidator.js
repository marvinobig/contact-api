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

  !name.match(/^(\w{2,})\s(\w{2,})$/m)
    ? (validationObj.name = "field needs your first & last name")
    : (validationObj.name = undefined);

  !subject.match(/[A-Za-z0-9]{5,}/)
    ? (validationObj.subject = "field needs to include 5 characters or more")
    : (validationObj.subject = undefined);

  !message.match(/([A-Za-z0-9\W]{5,})+/m)
    ? (validationObj.message = "field needs to include a sentence")
    : (validationObj.message = undefined);

  const errorValues = Object.values(validationObj);
  const errorsDoNotExist = errorValues.every((value) => value === undefined);

  errorsDoNotExist ? next() : res.status(400).send({ errors: validationObj });
};

module.exports = reqValidator;
