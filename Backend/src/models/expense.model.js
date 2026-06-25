import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Health",
        "Entertainment",
        "Other",
      ],
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


/*
Instance Method
*/

expenseSchema.methods.toExpenseJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    amount: this.amount,
    category: this.category,
    note: this.note,
    date: this.date,
  };
};


/*
Static Method
*/

expenseSchema.statics.getUserExpenses = async function (userId) {
  return this.find({ owner: userId })
    .sort({ date: -1 });
};


const Expense = mongoose.model(
  "Expense",
  expenseSchema
);

export default Expense;