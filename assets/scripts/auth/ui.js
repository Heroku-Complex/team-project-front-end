'use strict'

const store = require('../store')
const productsUi = require('../products/ui')
// if we use handlebars replace x with filename

const signUpSuccess = (data) => {
  $('#signUpModal').modal('hide')
  $('.text-field-product').val('')
  $('#UiSuccess').text('Created a new product successfully').fadeIn('fast').delay(5000).fadeOut('slow')
}

const signUpFailure = () => {
  $('.sign-up-error-msg').text('Oops! Something went wrong! Please check required fields and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const signInSuccess = (data) => {
  store.user = data.user
  store.total = 0
  $('.logged-out').hide()
  $('.logged-in').show()
  $('.cart-show').hide()
  $('.checkout-show').hide()
  $('.previousOrderList').hide()
  $('.pastOrder').remove()
  $('.greeting').text('welcome back, ' + data.user.email)
  $('.productListAdmin').hide()
  if (data.user.admin !== true) {
    $('#adminSeller').hide()
  }
}

const signInFailure = () => {
  $('.sign-in-error-msg').text('Oops! Something went wrong! Please check your username and password and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const changePasswordSuccess = (data) => {
  $('#changePwModal').modal('hide')
}

const changePasswordFailure = () => {
  $('.change-pw-error-msg').text('The password you entered is incorrect! Please try again.').fadeIn('fast').delay(3000).fadeOut('slow')
}

const signOutSuccess = (data) => {
  $('.logged-in').hide()
  $('.logged-out').show()
  store.cart = []
  store.orders = []
  store.currentOrder = null
  store.products = []
  store.user = {}
  $('#previousOrderTable tbody').empty()
}

const signOutFailure = () => {
}

const onCreateNewCartSuccess = function (data) {
  // response data will go here
  $('#UiFailure').text('Thank you for your order!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const onCreateNewCartFailure = function () {

}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  onCreateNewCartSuccess,
  onCreateNewCartFailure
}
