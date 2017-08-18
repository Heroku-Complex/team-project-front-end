'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

// this is the token retriever.
// It takes the CC data in the form, sends it to the third
// party Stripe API which then sends back a token which doesn't
// contain any information that is sensitive.
const handler = StripeCheckout.configure({
  key: 'pk_test_7fQwskkIwuWNEkWfcIyJZJKS',
  locale: 'auto'
  // Right here is where you want to be able to trouble shoot
  // as needed. To start use the following :
  // token: function (){
  // then we started with console.log(token) to learn what is
  // being sent back. The token.id is the component used
  // for any sort of troubleshooting.
// }
})
// closes the window when everything is complete
window.addEventListener('popstate', function () {
  handler.close()
})

const onFinalizeOrder = function () {
  const proof = store.proofOfSale
  const data = {
    'order': {
      'date_placed': '2017-08-10',
      'salesProof': {
        'id': proof.id,
        'amount': proof.amount,
        'currency': proof.currency,
        'status': proof.status
      },
      'products': store.cart,
      'isOpen': 'false',
      '_owner': store.user.id
    }
  }
  // const id = '598bb39e699c6896d5fff2a7'
  console.log(data)
  api.finalizeOrder(data)
    .then(ui.onFinalizePaymentSuccess)
    .catch(ui.onFinalizePaymentFailure)
}

const createNewCart = function () {
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
}

const handleToken = function (token) {
  // pull amount here from store.amount
  token.amount = 123
  // token.amount = store.amount
  // takes token and sends it out to the API
  api.makeCharge(token)
  // on success
    .then(ui.onStripeAPISuccess)
    .then(onFinalizeOrder)
    .then(createNewCart)
}

const shutUpAndTakeMyMoney = function (event) {
  // if (store.amount === undefined || store.amount === 0) {
  //   $('.purchaseConfirm').text('Please put something in the cart before making a purchase.').fadeIn('fast').delay(3000).fadeOut('slow')
  //   return
  // } else {
  handler.open({
    name: 'Fencer.com',
    description: 'Presentation Test Sales',
    token: handleToken
    // first, get a token from card on stripe api
    // Then send api and pay data to the stripe api, full payment
    // Wait for confirmation
    // Cool send confirmation data to mongodb
    // make a record of the purchase.
    // send confirmation
    // CATCHCATCHCATCH-drop token and warn the user.
  })
}

const addHandlers = () => {
  $('#buttonCheckout').on('click', shutUpAndTakeMyMoney)
}
module.exports = {
  addHandlers
}
