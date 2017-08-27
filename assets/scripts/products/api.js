'use strict'
const config = require('../config')
const store = require('../store')

// this is what loads when the landing page is accessed. It will display all
// of the products. It will also run everytime you click on a category, which
// will filter to only show the indexed products of a given category.
const showAllProducts = function () {
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createNewProduct = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const updateProduct = function (data, id) {
  return $.ajax({
    url: config.apiOrigin + '/products/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  showAllProducts,
  createNewProduct,
  updateProduct
}
