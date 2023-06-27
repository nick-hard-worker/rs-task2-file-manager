import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
const algorithm = 'sha256';

const calculateHash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const rs = createReadStream(filePath);
    const hash = createHash(algorithm);

    rs.on('data', chunk => hash.update(chunk));
    rs.on('end', () => resolve(hash.digest("hex")));
    rs.on('error', error => reject(error));
  });
};

export { calculateHash };