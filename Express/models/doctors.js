const fs = require("fs");
const path = require("path");

const listAllDoctors = (cb) => {
  fs.readFile(path.resolve(__dirname, "./doctors.txt"),"utf8", (err, doctors) => {
    if (err) throw err;
    cb(doctors);
  });
};

const addNewDoctor = (doctorData, cb) => {
  listAllDoctors(doctorsData => {
    const doctors = JSON.parse(doctorsData);
    doctorData["id"] = doctors.length + 1;
    doctors.push(doctorData);
    fs.writeFile(path.resolve(__dirname, "./doctors.txt"), JSON.stringify(doctors), 'utf8', () => {
      cb(doctorData);
    })
  });
};

const readDoctorData = (doctorId, cb) => {
  let doctorToReturn = {};
  listAllDoctors(doctorsData => {
    const doctors = JSON.parse(doctorsData);
    for (const doctor of doctors) {
      if (doctor.id == doctorId) {
        doctorToReturn = doctor;
      }
    }
    cb(doctorToReturn);
  });
};

const updateDoctorData = (doctorId, doctorData, cb) => {
  let editedDoctor = {};
  listAllDoctors(doctorsData => {
    const doctors = JSON.parse(doctorsData);
    for (const doctor of doctors) {
      if (doctor.id == doctorId) {
        editedDoctor = doctorData;
        editedDoctor["id"] = doctor.id
        doctors.splice(doctors.indexOf(doctor), 1);
        doctors.push(editedDoctor);
        fs.writeFile(path.resolve(__dirname, "./doctors.txt"), JSON.stringify(doctors), 'utf8', () => {});
      }
    }
    return cb(editedDoctor);
  });
};

const deleteDoctor = (doctorId, cb) => {
  let data = {};
  listAllDoctors(doctorsData => {
    const doctors = JSON.parse(doctorsData);
    for (const doctor of doctors) {
      if (doctor.id == doctorId) {
        data = doctor;
        doctors.splice(doctors.indexOf(doctor), 1);
        fs.writeFile(path.resolve(__dirname, "./doctors.txt"), JSON.stringify(doctors), 'utf8', () => {});
      }
    }
    cb(data);
  });
}


module.exports = {
  listAllDoctors,
  addNewDoctor,
  readDoctorData,
  updateDoctorData,
  deleteDoctor
};
