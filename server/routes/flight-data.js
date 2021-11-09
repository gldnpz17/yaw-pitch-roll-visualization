var express = require('express');
var router = express.Router();

const dataQueue = {
  queue: [],
  callbacks: [],
  push(data) {
    this.queue.push(data)
    this.emptyQueue()
  },
  listen(callback) {
    this.callbacks.push(callback)
  },
  unlisten(callback) {
    console.log('A listener has been removed.')
    const index = array.indexOf(callback);
    if (index > -1) {
      array.splice(index, 1);
    }
  },
  emptyQueue() {
    while(this.queue.length > 0) {
      let data = this.queue.shift()
      this.callbacks.forEach(callback => {
        callback(data)
      })
      console.log('Data sent to client(s).')
    }
  }
}

router.post('/flight-data', function(req, res, next) {
  dataQueue.push(JSON.stringify(req.body))

  res.send('data received.')
});

router.get('/flight-data', (req, res, next) => {
  console.log('Listener added.')

  let callback = (data) => {
    res.write(data)
  }

  dataQueue.listen(callback)
})

module.exports = router;
