const mongoose = require("mongoose")
const url = process.env.MONGODB_URI
const connectDatabase = async () => {
  mongoose.set("strictQuery", false)
  await mongoose.connect(url)
}

connectDatabase()
  .then(() => console.log("connected Successfully!"))
  .catch((err) => console.log("Unable to connect to MongoDB!", err))

const PhoneBook = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{8}$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! correct it like 012-11223344`,
    },
    required: [true, "User phone number required"],
  },
})

PhoneBook.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Phone", PhoneBook)
