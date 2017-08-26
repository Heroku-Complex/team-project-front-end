'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const ordersAPI = require('../orders/api')
const stripeEvents = require('../stripe/events')
const getFormFields = require('../../../lib/get-form-fields')

// show the product catalog on the landing page, this function is called on
// sign in
const onShowAllProducts = function (event) {
  event.preventDefault()
  api.showAllProducts()
    .then(ui.showAllProductsSuccess)
    .catch(ui.showAllProductsFailure)
}

const onProductsMenuButton = () => {
  $('.landingPage').show()
  $('#productTable').show()
  $('#cartPage').hide()
  $('#checkoutPage').hide()
  $('.previousOrderList').hide()
  $('.productListAdmin').hide()
}
const onOrderHistoryButton = () => {
  $('.landingPage').hide()
  $('#cartPage').hide()
  $('#checkoutPage').hide()
  $('.previousOrderList').show()
  $('.productListAdmin').hide()
}

const onShoppingCartMenuButton = () => {
  $('.landingPage').hide()
  $('#cartPage').show()
  $('#checkoutPage').hide()
  $('.previousOrderList').hide()
  $('.productListAdmin').hide()
}

const onCheckoutMenuButton = () => {
  $('.landingPage').hide()
  $('#cartPage').hide()
  $('#checkoutPage').show()
  $('.productListAdmin').hide()
}

const onSellerMenuButton = () => {
  $('.landingPage').hide()
  $('#cartPage').hide()
  $('#checkoutPage').hide()
  $('.productListAdmin').show()
}

const onBackToCartButton = () => {
  $('.landingPage').hide()
  $('#cartPage').show()
  $('#checkoutPage').hide()
  $('.productListAdmin').hide()
}

const onClearCart = () => {
  store.cart = []
  const data = store.currentOrder
  ordersAPI.deleteOrder(data)
    .then(stripeEvents.createNewCart)
    .then(ui.pushItemsToCart)
}

const onCreateProduct = (event) => {
  event.preventDefault()
  // const data = getFormFields(event.target)
  const data = {
    'product': {
      'name': 'Food',
      'price': '1',
      'category': 'stuff',
      'img_url': 'missing',
      'description': 'stuff',
      'rating': '1'
    }
  }
  // const data = {
  //   'product': {
  //     'name': document.getElementsByName('create-name') ,
  //     'price': document.getElementsByName('create-price'),
  //     'category': document.getElementsByName('create-category'),
  //     'img_url': document.getElementsByName('create-image'),
  //     'description': document.getElementsByName('create-description'),
  //     'rating': document.getElementsByName('create-rating')
  //   }
  // }
  console.log(data)
  api.createNewProduct(data)
    .then(ui.createNewProductSuccess)
    .then(ui.createNewProductFailure)
}

const onBackToShopping = () => {
  $('.landingPage').show()
  $('#productTable').show()
  $('#cartPage').hide()
  $('#checkoutPage').hide()
  $('.previousOrderList').hide()
}

const addHandlers = () => {
  $('#returnToProducts').on('click', onProductsMenuButton)
  $('#shoppingCartButton').on('click', onShoppingCartMenuButton)
  $('#orderHistoryButton').on('click', onOrderHistoryButton)
  $('#buttonProceedCheckout').on('click', onCheckoutMenuButton)
  $('#buttonBack').on('click', onBackToCartButton)
  $('#buttonClearCart').on('click', onClearCart)
  $('#buttonBackToShopping').on('click', onBackToShopping)
  $('#adminSeller').on('click', onSellerMenuButton)
  $('#create-product').on('submit', onCreateProduct)
}

module.exports = {
  onShowAllProducts,
  addHandlers
}
