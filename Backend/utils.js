const Notifications = require("./notification/model");
const Users = require("./user/model");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
"sk_test_51P1nTOGlYvYtl5HIzifJPQhsBZf7l1OsK7jpX2XTjnEClIdebW98AUVdmZk1nM3s4it9uKSiR4kBkepv75xht0Eh00rLZeFpGT");

const createMessageNotification = async ({ receiverId, senderId, chatId }) => {
  try {
    const sender = await Users.findById(senderId).select("-password");
    const newMessageNotification = new Notifications({
      receiverId,
      senderId,
      text: `A new message from ${sender?.firstname} ${sender?.lastname}`,
      url: `/chat/${chatId}`,
    });

    const notification = await newMessageNotification.save();
    return notification;
  } catch (error) {
    console.log(error.message, "error");
    throw error;
  }
};

const createStripe = async ({ token, total }) => {
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: total * 100,
        customer: customer.id,
        currency: "pkr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    return payment;
  } catch (error) {
    console.log(error.message, "error");
    throw error;
  }
};

const refundStripe = async (paymentId) => {
  try {
    const refund = await stripe.refunds.create({
      charge: paymentId,
    });

    return refund;
  } catch (error) {
    console.log(error.message, "error");
    throw error;
  }
};

const refundSpecificAmountStripe = async (paymentId, amountToRefund) => {
  try {
    const refund = await stripe.refunds.create({
      charge: paymentId,
      amount: amountToRefund * 100,
    });

    return refund;
  } catch (error) {
    console.log(error.message, "error");
    throw error;
  }
};

const releaseStripe = async (paymentId, amountToRefund) => {
    console.log(paymentId);
    const Rate = await stripe.balanceTransactions.list({
      source: paymentId,
    });

    const exchangeRate = Rate.data[0].exchange_rate;

    // const release = await stripe.transfers.create({
    //   amount: parseInt(amountToRefund * exchangeRate) * 100,
    //   currency: "usd",
    //   source_transaction: paymentId,
    //   destination: "acct_1P1oku2cDzJgQvnI",
    // });

    return true;
};

module.exports = {
  createMessageNotification,
  createStripe,
  refundStripe,
  releaseStripe,
  refundSpecificAmountStripe,
};
