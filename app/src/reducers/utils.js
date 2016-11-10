'use strict'

function cleanOrders(quote) {
  const cleanedOrders = [];
  const count = quote['count'];
  const orders = quote['orders'+count];
  for (var o in orders) {
    var order = {
      grade: orders[o]['grade'],
      quantity: orders[o]['quantity'],
      unit: orders[o]['unit'+count],
      spec: orders[o]['spec'],
      comments: orders[o]['comments'],
      price: orders[o]['price'+count],
      delivery: orders[o]['delivery'+count],
      terms: orders[o]['terms'+count],
      physical: orders[o]['physical'+count],
    }
    cleanedOrders.push(order);
  }
  return cleanedOrders;
}

export function cleanQuotes(quotes) {
  const cleanedQuotes = [];
  for (var q in quotes) {
    var cleaned = quotes[q];
    cleaned.orders = cleanOrders(quotes[q]);
    cleanedQuotes.push(cleaned);
  }
  return cleanedQuotes;
};
