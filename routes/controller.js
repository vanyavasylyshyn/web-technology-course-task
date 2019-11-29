"use strict"

const fs = require('fs');
const path = require('path');

let getDataFromFile = async (req, res) => {
  try {
    let data = fs.readFileSync(path.basename('../variantsData') + '/' + `${req.params.varN}` + ".json")
    return JSON.parse(data)

  } catch (err) {
    console.error("Getting data from file error: " + err)
    res.send("Such variant doesn't exist.")
  }
};


exports.getAllRecords = async (req, res) => {
  try {
    if (await getDataFromFile(req, res)) {
      res.send(await getDataFromFile(req, res));
    }

  } catch (err) {
    console.error(req.method + " /records error: " + err);
  }
}


exports.getRecordById = async (req, res) => {
  try {
    let result;
    let recordsData = await getDataFromFile(req, res);

    if (recordsData) {
      recordsData.table.forEach((data) => {
        if (data.id == req.params.id) {
          result = data;
        }
      })

      if (result === undefined) {
        res.send("No such id in the database");
      } else {
        res.send(result);
      }
    }

  } catch (err) {
    console.error(req.method + "/records/:id error: " + err);
  }
}

exports.setRecords = async (req, res) => {
  try {
    let recordsData = await getDataFromFile(req, res);

    if (recordsData) {
      res.send(`Record with data ${JSON.stringify(req.body)}
        was added.ID = ${recordsData.table[recordsData.table.length-1].id + 1}`);
    }

  } catch (err) {
    console.error(req.method + "/records error: " + err);
  }
}

exports.deleteRecord = async (req, res) => {
  try {
    let result;
    let recordsData = await getDataFromFile(req, res);

    if (recordsData) {
      recordsData.table.forEach((data) => {
        if (data.id == req.params.id) {
          result = `Record with id = ${data.id} was deleted`
        }
      })

      if (result === undefined) {
        res.send("No such id in the database");
      } else {
        res.send(result);
      }
    }

  } catch (err) {
    console.error(req.method + "/record/:id error: " + err);
  }
}

exports.updateRecord = async (req, res) => {
  try {
    let result;
    let recordsData = await getDataFromFile(req, res);

    if (recordsData) {
      recordsData.table.forEach((data) => {
        if (data.id == req.params.id) {
          result = `Record with id= ${data.id} was edited using data ${JSON.stringify(req.body)}`
        }
      })

      if (result === undefined) {
        res.send("No such id in the database")
      } else {
        res.send(result)
      }
    }

  } catch (err) {
    console.error(req.method + "/record/:id error: " + err)
  }
}