const Msg  = require('../models/msg');
const express = require('express');
const router = express.Router();


router.post('/new', (req, res) => {
    Msg.create({
        msg: req.body.msg,
    }, (err, msg) => {
        if (err) {
          console.log('CREATE Error: ' + err);
          res.status(500).send('Error');
        } else {
          res.status(200).json(msg);
        }
    });
});

router.route('/:id')
    /* DELETE */
    .delete((req, res) => {
        Msg.findById(req.params.id, (err, msg) => {
          if (err) { 
            console.log('DELETE Error: ' + err);
            res.status(500).send('Error');
          } else if (msg) {
            msg.remove( () => {
              res.status(200).json(msg);
            });
          } else {
            res.status(404).send('Not found');
          }
        });
    });

module.exports = router;