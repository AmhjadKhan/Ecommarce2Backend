import mongoose from 'mongoose';
import config from './app/config';
import app from './app';


// console.log('my name is khan')
async function main() { 
  try {
    
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');
    
    
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database or start the server:', error);
  }
}
main()
