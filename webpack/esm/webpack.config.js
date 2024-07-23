// webpack.config.js
import path from 'path';

export default {
  entry: './src/index.js', // Entry point aplikasi Anda
  output: {
    filename: 'bundle.js', // Nama file output
    path: path.resolve('dist') // Direktori output
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Semua file .js
        exclude: /node_modules/, // Kecuali di dalam node_modules
        use: {
          loader: 'babel-loader', // Menggunakan Babel
          options: {
            presets: ['@babel/preset-env'] // Preset yang digunakan oleh Babel
          }
        }
      }
    ]
  },
  mode: 'production', // Mode produksi untuk optimasi
  target: 'node' // Menargetkan lingkungan Node.js
};
