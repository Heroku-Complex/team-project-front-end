'use strict'

const config = require('../config')
const store = require('../store')
const cart = require('../cart')

// order history
const showAllOrders = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// this request is not a button on the front end. This is the api request that
// is automatically triggered when an order is submitted.
// this is the api call to handle when a product is added to the shoppingCart
const addOrder = function (data) {
  data.orders.products = cart.cart
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  })
}

// This is the api request that occurs when a product is added, removed, updated
// in the shoppingCart.
// This also fires when you submit an order, it sets the date the order was
// placed and it changes the isOpen value to false.
const updateOrder = function (data) {
  data.order.products = cart
  return $.ajax({
    url: config.apiOrigin + '/orders/' + data.order.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteOrder = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/orders/' + data.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  showAllOrders,
  addOrder,
  updateOrder,
  deleteOrder
}
