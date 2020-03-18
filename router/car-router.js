const express = require('express'); //import express

const db = require('../data/config'); //import the database

const router = express.Router(); //declare

router.get("/", (req, res) => {
    db("cars")
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve cars" });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("cars")
        .where({ id })
        .first()
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve cars" });
        });
});

router.post("/", (req, res) => {
    const carsData = req.body;
    db("cars")
        .insert(carsData, "id")
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(newcarsEntry => {
                    res.status(201).json(newcarsEntry);
                });
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Failed to store data" });
        });
});

router.put("/:id", (req, res) => {
    const changes = {
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmission: req.body.transmission,
            titleStatus: req.body.titleStatus,
        } //defining where updates take place

    db.select("*").from("cars").where({ id: req.params.id })
        .update(changes) //updates the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ Message: "record updated successfully" })
            } else {
                res.status(404).json({ message: " There was a glitch in the matrix." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, There was a glitch in the matrix!" });
        })
})

router.delete('/:id', (req, res) => {
    db.select("*").from("cars").where({ id: req.params.id })
        .del() //deletes the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ Message: "record deleted successfully" })
            } else {
                res.status(404).json({ message: " sorry, you took the blue pill." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, There was an error somewhere in the code" });
        })
});



module.exports = router; //export the router