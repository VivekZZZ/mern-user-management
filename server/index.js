const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userModel = require("./Model/Users");
const adminModel = require("./Model/Admin");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

// register admin
// app.post("/registerAdmin", (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   adminModel
//     .findOne({ email })
//     .then((existingAdmin) => {
//       console.log("0");
//       if (existingAdmin) {
//         console.log("1");
//         return res.status(409).json({ message: "Email already exists" });
//       } else {
//         console.log("2");
//         return adminModel.create(req.body);
//       }
//     })
//     .catch((err) => {
//       console.log("3");
//       res.status(500).json({ error: "Internal Server Error", err });
//     });
// });

app.post("/registerAdmin", (req, res) => {
  const { email } = req.body;
  adminModel
    .findOne({ email })
    .then((admin) => {
      if (admin) {
        res.json("FAIL");
      } else {
        adminModel
          .create(req.body)
          .then((admin) => {
            res.json(admin);
          })
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

app.post("/loginAdmin", (req, res) => {
  const { email, password } = req.body;
  adminModel
    .findOne({ email })
    .then((admin) => {
      if (admin) {
        if (admin.password === password) {
          res.json("SUCCESS");
        } else {
          res.json("INCORRECT_PASSWORD");
        }
      } else {
        res.json("INCORRECT_EMAIL");
      }
    })
    .catch((err) => {
      // console.log(err);
      res.json(err);
    });
});

// create a user
app.post("/createUser", (req, res) => {
  console.log(req.body);
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// get all users
app.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// get a single user
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findOne({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// update a user
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .updateOne(
      { _id: id },
      {
        name: req.body.name,
        salary: req.body.salary,
        company: req.body.company,
      }
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// delete a user
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .deleteOne({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
