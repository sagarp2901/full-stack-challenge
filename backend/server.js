import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Employee from "./models/Employee";

// Create a new express app
const app = express();
const router = express.Router();

// Allow cors
app.use(cors());

// Use json body parser
app.use(bodyParser.json());

// If using a local installation of mongoDB
// mongoose.connect("mongodb://localhost:27017/employees");

// Current project database on Mlabs instance
mongoose.connect("mongodb://dev1:developer1@ds115283.mlab.com:15283/employees");

// Create and open a mongoDB connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Get all employees
router.route("/employees").get((req, res) => {
  Employee.find((err, employees) => {
    if (err) console.log(err);
    else res.json(employees);
  });
});

// Get employee by id
router.route("/employees/:id").get((req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) console.log(err);
    else res.json(employee);
  });
});

// Add an employee
router.route("/employees/add").post((req, res) => {
  let employee = new Employee(req.body);
  employee
    .save()
    .then(employee => {
      return Employee.find((err, employees) => {
        if (err) console.log(err);
        else {
          res
            .status(200)
            .json({ message: "New Employee Added Successfully", employees });
        }
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Update employee by Id
router.route("/employees/update/:id").post((req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (!employee) return next(new Error("Could not load document"));
    else {
      employee.name = req.body.name;
      employee.image = req.body.image;
      employee.title = req.body.title;
      employee.adminReview = req.body.adminReview;
      employee.feedbacks = req.body.feedbacks;
      employee.reviewers = req.body.reviewers;
      employee.ratings = req.body.ratings;
      // Sending admin rating to the db so it can be retrieved again
      employee.adminRating = req.body.adminRating;
      employee.employeeReview = req.body.employeeReview;
      employee.employeeRating = req.body.employeeRating;

      employee
        .save()
        .then(employee => {
          return Employee.find((err, employees) => {
            if (err) console.log(err);
            else {
              res
                .status(200)
                .json({ message: "Employee Updated Successfully", employees });
            }
          });
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    }
  });
});

// Delete employee by id
router.route("/employees/delete/:id").get((req, res) => {
  Employee.findByIdAndRemove({ _id: req.params.id }, (err, employee) => {
    if (err) res.json(err);
    else
      return Employee.find((err, employees) => {
        if (err) console.log(err);
        else {
          res
            .status(200)
            .json({ message: "Employee Deleted Successfully", employees });
        }
      });
  });
});

app.use("/", router);

// Server listen on port 4000
app.listen(4000, () => console.log("Express server is running on port 4000"));
