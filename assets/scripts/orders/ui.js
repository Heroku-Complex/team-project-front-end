'use strict'
const showOrdersTemplate = require('../templates/orders.handlebars')
const store = require('../store')

let orderHistoryHandlebarsArrayDeluxe = []
// refines the past order data

const cleanRyansFunction = function (order) {
  if (order.isOpen === false) {
    for (let i = 0; i < store.products.length; i++) {
      for (let j = 0; j < order.products.length; j++) {
        if (store.products[i].id === order.products[j].product_id) {
          order.products[j].name = store.products[i].name
        }
        if (!order.products[j].name) {
          order.products[j].name = 'Harmless kittens'
        }
      }
    }
    const pojo = {
      date_placed: order.date_placed.split('T')[0],
      products: order.products,
      total: order.salesProof.amount
    }
    orderHistoryHandlebarsArrayDeluxe.push(pojo)
  } else {
    store.currentOrder = order
    store.cart = order.products
  }
}

const showAllOrdersSuccess = function (data) {
  store.orders = data.orders
  store.orders.forEach(cleanRyansFunction)

  const showOrdersHTML = showOrdersTemplate({ orders: orderHistoryHandlebarsArrayDeluxe })
  $('#previousOrderTable tbody').empty()
  $('#previousOrderTable tbody').append(showOrdersHTML)
  orderHistoryHandlebarsArrayDeluxe = []
}

const showAllOrdersFailure = function () {
}

const addOrderSuccess = function () {

}
const addOrderFailure = function () {

}

const updateOrderSuccess = function (data) {
}
const updateOrderFailure = function () {

}
const deleteOrderSuccess = (data) => {
}

const deleteOrderFailure = (data) => {

}

module.exports = {
  showAllOrdersSuccess,
  showAllOrdersFailure,
  addOrderSuccess,
  addOrderFailure,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderSuccess,
  deleteOrderFailure
}
