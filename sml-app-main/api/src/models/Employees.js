const { Schema, model } = require("mongoose");

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

employeesSchema.pre("find", function () {
  this.where({ deleted: false });
});

const Employees = model("Employees", employeesSchema);

module.exports = Employees;
