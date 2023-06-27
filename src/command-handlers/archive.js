import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const getArchiveStream = {
  compress: createBrotliCompress(),
  decompress: createBrotliDecompress()
};

const archive = async (command, inputFilePath, outputFilePath) => {
  const inputFileStream = createReadStream(inputFilePath);
  const outputFileStream = createWriteStream(outputFilePath);

  const archiveStream = getArchiveStream[command];

  await pipeline(
    inputFileStream,
    archiveStream,
    outputFileStream
  );
};

export { archive };
