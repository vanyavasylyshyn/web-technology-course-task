var express = require('express');
var router = express.Router();

const controller = require('./controller');

router.get('/:varN/records', async (req, res) => {
  controller.getAllRecords(req, res);
})

router.get('/:varN/records/:id', async (req, res) => {
  controller.getRecordById(req, res);
})

router.post('/:varN/records', async (req, res) => {
  controller.setRecords(req, res);
})

router.delete('/:varN/record/:id', async (req, res) => {
  controller.deleteRecord(req, res);
})

router.put('/:varN/record/:id', async (req, res) => {
  controller.updateRecord(req, res);
})

module.exports = router;