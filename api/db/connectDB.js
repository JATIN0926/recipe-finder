import mongoose from "mongoose";
export const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connect to DB!!");
    })
    .catch((error) => {
      console.log(error);
    });
};
