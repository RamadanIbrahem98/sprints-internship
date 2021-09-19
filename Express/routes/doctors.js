const { 
  listAllDoctors,
  addNewDoctor,
  readDoctorData,
  updateDoctorData,
  deleteDoctor
 } = require('../models/doctors')
const router = require("express").Router();

router.get("/", (req, res) => {
  listAllDoctors(doctors => {
    return res.send(doctors);
  });
});

router.get("/:id", (req, res) => {
  readDoctorData(req.params.id, doctor => {
    if (doctor["id"]) {
      return res.send(doctor);
    }
    return res.status(404).send({message: "No doctors found with this id"});
  });
});

router.post("/", (req, res) => {
  let newDoc = {"name": req.body.name, "age": req.body.age};
  addNewDoctor(newDoc, doctor => {
    return res.send(doctor);
  });
});

router.put("/:id", (req, res) => {
  let newData = {id: req.params.id, name: req.body.name, age: req.body.age};
  updateDoctorData(req.params.id, newData, doctor => {
    console.log(doctor);
    if (doctor["id"]) {
      return res.send(doctor);
    }
    return res.status(404).send({message: "No doctors found with this id"});
  });
});

router.delete("/:id", (req, res) => {
  deleteDoctor(req.params.id, doctor => {
    console.log(doctor);
    if (doctor["id"]) {
      return res.send({message: "Deleted Successfully!"});
    }
    return res.status(404).send({message: "No doctors found with this id"});
  });
});

module.exports = router;
