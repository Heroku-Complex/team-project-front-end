'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const productsApi = require('../products/api')
const productsUi = require('../products/ui')
const ordersApi = require('../orders/api')
const ordersUi = require('../orders/ui')
const store = require('../store')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
  } else {
    ui.signUpFailure()
  }
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
    .then(productsApi.showAllProducts)
    .then(productsUi.showAllProductsSuccess)
    .then(ordersApi.showAllOrders)
    .then(ordersUi.showAllOrdersSuccess)
    .then(productsUi.carriageBoy)
    .then(productsUi.sellerAdmin)
    .catch(productsUi.showAllProductsFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-pw').on('submit', onChangePassword)
}

module.exports = {
  addAuthHandlers
}
