import app from './app';
const production = process.env.NODE_ENV === 'production';

export default context => {
  return new Promise((resolve, reject) => {
    const {url} = context;
    resolve(app);
  });
}

