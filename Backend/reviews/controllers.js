const asyncHandler = require("express-async-handler");
const Review = require("./model.js");

//  @desc   :  Create Review
//  @Route  :  POST /reviews
//  @access :  Private
const createReview = asyncHandler(async (req, res) => {
  const { bookingId, cartId } = req.body;

  console.log(req.body);

  // Try to find a rating with the given bookingId and cartId
  const updatedReview = await Review.findOneAndUpdate(
    { bookingId, cartId },
    { $set: req.body },
    { new: true, upsert: true } // Create a new document if it doesn't exist
  );

  res.status(200).json(updatedReview);
});

//  @desc   :  Get Review
//  @Route  :  Get /reviews
//  @access :  Private
const getReview = asyncHandler(async (req, res) => {
  const id = req.user._id;

  try {
    const ratings = await Review.find({})
      .populate({ path: "bookingId", populate: { path: "userId" } })
      .populate({ path: "cartId", populate: { path: "servicesId" } });

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//  @desc   :  Get Overall Review
//  @Route  :  Get /reviews/overall
//  @access :  Public
const getOverallReview = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate({ path: "bookingId", populate: { path: "userId" } })
      .populate({ path: "cartId", populate: { path: "servicesId" } });

    const servicesIdMap = new Map();

    // Calculate average rating for each servicesId
    reviews.forEach((review) => {
      const servicesId = review?.cartId?.servicesId?._id.toString();
      const rating = review.client.rating;

      if (servicesIdMap.has(servicesId)) {
        const { totalRating, numberOfReviews } = servicesIdMap.get(servicesId);
        servicesIdMap.set(servicesId, {
          totalRating: totalRating + rating,
          numberOfReviews: numberOfReviews + 1,
        });
      } else {
        servicesIdMap.set(servicesId, {
          totalRating: rating,
          numberOfReviews: 1,
        });
      }
    });

    // Create response format with rounded average rating between 1 and 5
    const response = [];
    servicesIdMap.forEach((value, key) => {
      const averageRating = Math.round(
        value.totalRating / value.numberOfReviews
      );
      const roundedRating = Math.min(5, Math.max(1, averageRating)); // Ensure rating is between 1 and 5
      response.push({ servicesId: key, rating: roundedRating });
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//  @desc   :  Get Review By Service Id
//  @Route  :  Get /reviews/:id
//  @access :  Public
const getReviewByUserId = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await Review.find({})
      .populate({ path: "bookingId", populate: { path: "userId" } })
      .populate({
        path: "cartId",
        populate: { path: "servicesId", select: "-multipleImages" },
      });

    const filteredReview = reviews.filter(
      (item) => item.cartId.servicesId?._id == id
    );

    res.status(200).json(filteredReview);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//  Exporting the routes
module.exports = {
  createReview,
  getReview,
  getOverallReview,
  getReviewByUserId,
};
