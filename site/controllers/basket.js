let receive = require('../lib/receive.js');
let send = require('../lib/send.js');
let respond = require('../lib/respond.js');
let database = require('../lib/database.js');
let preMail = require('../lib/presetMails.js');
let productLib = require('../lib/products.js')

module.exports = {
  handle: async function(request, response) {
    if (request.method == 'POST') {
      receive.readBody(postHandler, request, response)
    }
    else if (request.method  == 'GET') {
      getHandler(request, response);
    }
  }
};

async function getHandler(request, response) {
  if (request.url.endsWith("/get_basket_row_layout")) {
    let path = 'client/public/components/product_basket_row.html';
    send.sendPage(path, request, response);
  }
}

async function postHandler(object, request, response) {
  if (request.url.endsWith("/check_basket")) {
    let result = await productLib.compareOrderWithProductDB(object);
    send.sendObject(result, response);
  }
}
