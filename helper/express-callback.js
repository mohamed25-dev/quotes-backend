const makeExpressCallback = function (controller) {
  return async (req, res) => {
    let httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      headers: {
        'Content-Type': req.get('Content-Type')
      }
    }

    try {
      let httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.type('json');
      res.status(httpResponse.statusCode).send(httpResponse.body);
      
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = makeExpressCallback;