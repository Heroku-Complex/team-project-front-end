'use strict'

const store = require('../store')
// const cart = require('../cart')
const api = require('../stripe/api')
const ui = require('../stripe/ui')
const ordersUi = require('../orders/ui')
const ordersApi = require('../orders/api')

const showProductsTemplate = require('../templates/products.handlebars')
const showCartTemplate = require('../templates/cart.handlebars')
const showCheckoutTemplate = require('../templates/checkout-cart.handlebars')
// const orderApi = require('../orders/api')

// This variable represents the array of products that will be patched into the
// active order.
let cart = []
let productData
// When a user adds an item to an order, this will pass the item's id and the
// quanity value the user entered into an array and pushes it to the shopping
// cart array.
const onAddItemToCartArray = function (event) {
  event.preventDefault()
  const item = {
    "product_id": $(this).closest('form').find("input[name='id']").val(),
    "quantity": $(this).closest('form').find("input[name='quantity']").val()
  }
  // store.amount += parseInt($(this).closest('form').find("input[name='price']").val()) * parseInt($(this).closest('form').find("input[name='quantity']").val())
  // cart.push(item)
  carriageBoy()
  store.cart.push(item)
  console.log('store.cart currently is ', store.cart)
  updateExistingCart()
  // ordersApi.showAllOrders()
  //   .then(ordersUi.showAllOrdersSuccess)
}

const removeFromCartArray = function (event) {
  const newCart = cart.filter(function (item) {
    if (item.product_id !== $(event.target).data('id')) {
      return item
    }
  })
  cart = newCart
  pushItemsToCart()
}

const populateCheckout = function (event) {
  event.preventDefault()
  const filteredData = productData.products.filter(function (item) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id === item.id) {
        item.quantity = cart[i].quantity
        return item
      }
    }
  })
  const showCheckoutHTML = showCheckoutTemplate({ products: filteredData })
  $('#checkoutTable tbody').empty()
  $('#checkoutTable tbody').append(showCheckoutHTML)
  // $('#cartPage').hide()
  // $('#checkoutPage').show()
}

const pushItemsToCart = function () {
  const filteredData = productData.products.filter(function (item) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id === item.id) {
        item.quantity = cart[i].quantity
        return item
      }
    }
  })
  const showCartHTML = showCartTemplate({ products: filteredData })
  $('#cartTable tbody').empty()
  $('#cartTable tbody').append(showCartHTML)
  $('.removeFromCart').on('click', removeFromCartArray)
  // $('#buttonProceedCheckout').on('submit', console.log('works'))
  // add clear cart
  // proceed to checkout
}
// const getCartId = function (item) {
//   if (item.isOpen === true) {
//     cartID = item.id
//   }
// }

// const updateCart = function (data) {
//   const orders = data.orders
//   orders.forEach(getCartId)
//   console.log(cartID)
//   $('#updateCart-id').val(cartID)
//   $('#updateCart-userid').val(store.user.id)
//   console.log(store.user.id)
//   $('#updateCart').submit()
// }

const showAllProductsSuccess = function (data) {
  store.products = data.products
  const showProductsHTML = showProductsTemplate({ products: data.products })
  $('#productTable').show()
  $('#productTable tbody').empty()
  $('#productTable tbody').append(showProductsHTML)
  $('.addToCart').on('submit', onAddItemToCartArray)
  productData = data
  $('#shoppingCartButton').on('click', pushItemsToCart)
  $('#buttonProceedCheckout').on('click', populateCheckout)
}

const showAllProductsFailure = function () {
  // $('#UiFailure').text('something went wrong')
}

// create a cart if there isn't one and if there is one then send a patch request to update the existing cart
const carriageBoy = () => {
  if (!store.currentOrder) {
    console.log('carriageBoy active')
    const data = {
      'order': {
        'date_placed': '2017-08-10',
        'products': [{}],
        'isOpen': 'true',
        '_owner': store.user.id
      }
    }
    api.createNewCart(data)
      .then(ui.onCreateNewCartSuccess)
      .catch(ui.onCreateNewCartFailure)
  } else {
    console.log('We fucked it up. store.currentOrder =', store.currentOrder)
  }
}

const updateExistingCart = () => {
  const id = store.currentOrder.id
  const data = {
    'order': {
      'products': store.cart
    }
  }
  console.log('updateExistingCart data=', data)

  api.finalizeOrder(data, id)
    .then(ui.onUpdateExisitingCartSuccess)
    .catch(ui.onUpdateExisitingCartFailure)
}

module.exports = {
  showAllProductsSuccess,
  showAllProductsFailure
}
