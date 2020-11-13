import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected on ${connection.connection.host}`.cyan);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
