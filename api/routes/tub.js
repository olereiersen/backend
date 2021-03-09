const express = require('express');
const router = express.Router();

const Tub =  require('../models/tub')

/*const pos = {state: 0, start: null}
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
    ];*/

/*const initTub = (id, state, start) => {

}*/

// Handle READ - /api/tub/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Tub.findById(id)
    .exec()
    .then(doc => {
        var result = null;
        if(!doc) {
            const tub = Tub({
                _id: id,
                state: 0,
                start: null
            });
            result = tub;
            tub.save()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            });
        } else {
            result = doc;
            console.log(result)
            res.status(200).json(result)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
});


// Handle UPDATES - /api/tub/:id
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    
    Tub.updateOne({"_id": id}, { $set: {"state": req.body.state, "start": req.body.start} } )
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            result: result
          });        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
          });
    })

});


// Handle INSERT - /api/tub/:id
router.post('/:id', (req, res, next) => {
    const id = req.params.id;

    const tub = Tub({
        _id: id,
        state: req.body.state,
        start: req.body.start
    });
    console.log(tub)

    tub.save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Lagret',
            tub
          });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
          });
    });


});


// Handle INSERT - /api/tub/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Tub.deleteOne({_id: id})
    .exec()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Slettet',
          });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
          });
    });

});



module.exports = router;