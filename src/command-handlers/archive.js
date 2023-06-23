import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';

const compress = async (inputFilePath, outputFilePath) => {
  const inputFileStream = createReadStream(inputFilePath);
  const outputFileStream = createWriteStream(outputFilePath);

  const compressStream = createBrotliCompress();

  pipeline(
    inputFileStream,
    compressStream,
    outputFileStream,
    (err) => {
      if (err) {
        console.error('Compresses file error', err);
        return;
      }
      console.log('Completed successfully.');
    }
  );
};

const decompress = async (inputFilePath, outputFilePath) => {
  const inputFileStream = createReadStream(inputFilePath);
  const outputFileStream = createWriteStream(outputFilePath);

  const decompressStream = createBrotliDecompress();

  pipeline(
    inputFileStream,
    decompressStream,
    outputFileStream,
    (err) => {
      if (err) {
        console.error('Decompresses file error', err);
        return;
      }
      console.log('Completed successfully.');
    }
  );
};

export { compress, decompress };
