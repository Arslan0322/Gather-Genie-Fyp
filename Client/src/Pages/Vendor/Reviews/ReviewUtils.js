export const ReviewsData = [
  "Service Name",
  "Client Name",
  "Comments",
  "Ratings",
];

export const generateReviewElements = (item, data, reviewData) => {
  let content = '';
  const filteredReview = reviewData?.filter(filteredData => (
    filteredData.cartId._id === data._id
  ))

  switch (item) {
    case 'Service Name':
      content = data?.servicesId.name;
      break;
    case 'Client Name':
      content = `${data?.userId?.firstname} ${data?.userId?.lastname}`;
      break;
    case 'Comments':
      content = filteredReview[0]?.client?.comment || "Not Yet Comment";
      break;
    case 'Ratings':
      content = filteredReview[0]?.client?.rating;
      break;
    default:
      content = '';
  }

  return content
}