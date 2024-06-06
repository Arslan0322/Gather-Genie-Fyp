export const isBookingRecent = (createdDate, paymentStatus) =>{
    const currentTime = new Date();
    const bookingDate = new Date(createdDate);
    const timeDifference = currentTime - bookingDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

    return hoursDifference <= 48 && paymentStatus === "Confirm";
}