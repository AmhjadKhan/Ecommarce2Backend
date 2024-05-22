import mongoose from 'mongoose';
import config from './app/config';
import app from './app';


// console.log('my name is khan')
async function main() { 
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port is ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main()
