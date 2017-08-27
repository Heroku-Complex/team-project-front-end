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
  const data = {
    'product': {
      'name': document.getElementById('create-name').value,
      'price': document.getElementById('create-price').value,
      'category': document.getElementById('create-category').value,
      'img_url': document.getElementById('create-image').value,
      'description': document.getElementById('create-description').value,
      'rating': document.getElementById('create-rating').value
    }
  }
  console.log(data)
  api.createNewProduct(data)
    .then(ui.createNewProductSuccess)
    .then(ui.createNewProductFailure)
}

const onEditProduct = (event) => {
  event.preventDefault()
  let data = event.relatedTarget

  // const data = {
  //   'product': {
  //     'name': document.getElementById('create-name').value,
  //     'price': document.getElementById('create-price').value,
  //     'category': document.getElementById('create-category').value,
  //     'img_url': document.getElementById('create-image').value,
  //     'description': document.getElementById('create-description').value,
  //     'rating': document.getElementById('create-rating').value
  //   }
  // }
  console.log('This is', data)
  // api.createNewProduct(data)
  //   .then(ui.createNewProductSuccess)
  //   .then(ui.createNewProductFailure)
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
  // $('.list-group-item').on('click', onEditProduct)
  $('#editDeleteModal').on('show.bs.modal', function (event) {
    const converter = $(event.relatedTarget)
    for (let i = 0; i < store.products.length; i++) {
      if (store.products[i].id === converter[0].id) {
        document.getElementById('image-link').value = store.products[i].img_url
        document.getElementById('name-text').value = store.products[i].name
        document.getElementById('description-text').value = store.products[i].description
        document.getElementById('category-text').value = store.products[i].category
        document.getElementById('price-number').value = store.products[i].price
        document.getElementById('rating-number').value = store.products[i].rating
      }
    }
  })
  $('#save-name-edit').on('click', onEditProduct)
}

module.exports = {
  onShowAllProducts,
  addHandlers
}
