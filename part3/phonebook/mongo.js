const mongoose = require("mongoose");

// const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = process.env.MONGODB_URI;

const connectDatabase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(url);
};

connectDatabase()
  .then(() => console.log("connected Successfully!"))
  .catch((err) => console.log("Unable to connect to MongoDB!", err));

const PhoneBook = new mongoose.Schema({
  name: String,
  number: String,
});

PhoneBook.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Phones = mongoose.model("Phone", PhoneBook);

if (name && number) {
  const newPhone = new Phones({
    name,
    number,
  });

  newPhone.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else
  Phones.find().then((phone) => {
    console.log("phonebook:", phone);
    // for (const phon of phone) {
    //   console.log(phon.name, phon.number);
    // }
    mongoose.connection.close();
  });
