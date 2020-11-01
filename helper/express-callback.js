const httpResponseWrapper = require('../common/response');

const makeExpressCallback = function (controller) {
  return async (req, res) => {
    let httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      user: req.user,
      headers: {
        'Content-Type': req.get('Content-Type')
      }
    }

    try {
      let httpResponse = await controller(httpRequest);
      httpResponseWrapper.success(res, httpResponse);

    } catch (error) {
      // res.status(500).send({ error: error.message });
      httpResponseWrapper.error(res, error);
    }
  }
}

module.exports = makeExpressCallback;