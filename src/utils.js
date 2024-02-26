const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatPaymentData(data) {
  return data.map((item) => {
    const formattedItem = {
      _id: item._id,
      amount: item.amount,
      paymentDate: formatDate(item.paymentDate),
      membershipStartDate: formatDate(item.membershipStartDate),
      membershipEndDate: formatDate(item.membershipEndDate),
    };
    return formattedItem;
  });
}

function formatDate(date, isYear2Digit = true) {
  let formattedDate = '-';
  if (date !== undefined && date.length !== 0 ) {
    date = new Date(date);

    const day = date.getDate();
    const month = monthNames[date.getMonth()].slice(0, 3);
    let year = date.getFullYear();

    if (isYear2Digit) {
      year = year % 100;
    }

    formattedDate = `${day} ${month} ${year}`;
  }
  return formattedDate;
}

module.exports = {
  formatPaymentData,
  formatDate,
};
