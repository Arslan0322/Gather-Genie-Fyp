export const priceRangeConverter = (price) => {
    let minPrice, maxPrice
    if (price === "Below 10000") {
        minPrice= 0
        maxPrice= 10000
    } else if (price === "60000 onwards") {
        minPrice= 60000
        maxPrice= Number.MAX_SAFE_INTEGER
    } else {
      const splitPrice = price.split('-');
      minPrice = parseInt(splitPrice[0].trim());
      maxPrice = parseInt(splitPrice[1].trim());
      
    }

    return { minPrice, maxPrice };
  };

export const filterServiceDetail = (data, form, overallReviewData) => {
  let filteredData = [...data];
  const { city, price, rating } = form;

  if (price !== '' && city === '' && rating === null) {
      const { minPrice, maxPrice } = priceRangeConverter(price);
      filteredData = filteredData.filter(
          (item) => parseInt(item?.price) >= minPrice && parseInt(item?.price) <= maxPrice
      );
  } else if (city !== '' && price === '' && rating === null) {
      filteredData = filteredData.filter((item) => item?.city === city);
  } else if (city !== '' && price !== '' && rating === null) {
      const { minPrice, maxPrice } = priceRangeConverter(price);
      filteredData = filteredData.filter(
          (item) => parseInt(item?.price) >= minPrice && parseInt(item?.price) <= maxPrice && item?.city === city
      );
  } else if (city === '' && price === '' && rating !== null) {
      filteredData = filteredData.filter((item) =>
          overallReviewData.some((reviewData) => (
              item._id === reviewData.servicesId && rating === reviewData?.rating
          ))
      );
  } else if (city === '' && price !== '' && rating !== null) {
      const { minPrice, maxPrice } = priceRangeConverter(price);
      filteredData = filteredData.filter((item) =>
          overallReviewData.some((reviewData) => (
              item._id === reviewData.servicesId && rating === reviewData?.rating &&
              parseInt(item?.price) >= minPrice && parseInt(item?.price) <= maxPrice
          ))
      );
  } else if (city !== '' && price !== '' && rating !== null) {
      const { minPrice, maxPrice } = priceRangeConverter(price);
      filteredData = filteredData.filter((item) =>
          overallReviewData.some((reviewData) => (
              item._id === reviewData.servicesId && rating === reviewData?.rating &&
              parseInt(item?.price) >= minPrice && parseInt(item?.price) <= maxPrice && item?.city === city
          ))
      );
  }

  return filteredData;

}
  