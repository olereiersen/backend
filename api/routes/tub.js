const express = require('express');
const router = express.Router();

const pos = {state: 0, start: null}
const store = [
        {id:1, state: 0, start: null},
        {id:2, state: 0, start: null},
        {id:3, state: 0, start: null},
        {id:4, state: 0, start: null},
        {id:5, state: 0, start: null},
        {id:6, state: 0, start: null},
        {id:7, state: 0, start: null},
        {id:8, state: 0, start: null},
        {id:9, state: 0, start: null},
        {id:10, state: 0, start: null},
        {id:11, state: 0, start: null},
        {id:12, state: 0, start: null}
    ];

// Handle incomming GET requests to /api/tub/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const unit = store.find((item) => item.id==id);
    res.status(200).json(unit);
});

// Handle incomming POST 
router.post('/:id', (req, res, next) => {
    const id = req.params.id;
    const unit = store.find((item) => item.id==id);
    unit.state = req.body.state;
    unit.start = req.body.start;

    res.status(201).json({
        message: 'Lagret',
        unit
      });

});


module.exports = router;