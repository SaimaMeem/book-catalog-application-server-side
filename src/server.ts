import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function connectDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Datebase connection established.');
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database.', err);
  }
}
connectDatabase().catch(err => console.log(err));
