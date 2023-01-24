const braintree = require("braintree");
const { merchantId, publicKey, privateKey } = require("../envVariables");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: merchantId,
  publicKey: publicKey,
  privateKey: privateKey,
});

exports.getToken = (req, res) => {
  console.log("getToken called in the backend");
  console.log("MERCHANT ID: ", merchantId);
  console.log("PUBLIC KEY: ", publicKey);
  console.log("PRIVATE KEY: ", privateKey);
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    const clientToken = response.clientToken;
    res.send(response);
  });
};

exports.processPayment = (req, res) => {
  const nonceFromTheClient = req.body.nonceFromTheClient;
  const amount = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      return res.send(result);
    }
  );
};
