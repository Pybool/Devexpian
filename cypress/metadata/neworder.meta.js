const newOrderMetaData = {
  DATA_OBJECT: {
    market: "Ravenglass",
    from: "Dalegarth station",
    to: "Ravenglass station",
    who: "2x Adult, 2x Child",
    options_available: "14:00 £28.00",
    firstname: "Taye",
    lastname: "Tester",
    email: "taye.oyelekan@expian.io",
    telephone: "01234567890",
    country: "United Kingdom",
    line_1: "99 Tester Lane",
    town: "Tester Town",
    post_code: "EC1 4RW",
    "cardholder-name": "Taye Tester",
    "card-number": "4929000000006",
    "expiry-date": "1230",
    "security-code": "123",
    market_when: ["From", "To", "Who", "when"],
    Channel: "Reservations",
    Payment_Method: "Card",
    Country_Code: "GB",
    orderID: "ULO7XVEGJ8GZM",
  },

  orderCompleteStyles: {
    color: "rgb(117, 164, 14)",
    "font-size": "28px",
  },

  texts: {
    orderThanks: { selector: "h5", msg: "Thank you for your booking!" },
    bookingConfrimed: {
      selector: "p.chakra-text",
      msg: "The payment has been received and booking confirmed.",
    },
    contactDetails: { selector: "h5", msg: "Contact Details:" },
    ticketDelivery: { selector: "h5", msg: "Ticket Delivery:" },
  },
}

export default newOrderMetaData
