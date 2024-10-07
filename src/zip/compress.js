import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
const compress = async () => {
  const source = createReadStream("src/zip/files/fileToCompress.txt");
  const destination = createWriteStream("src/zip/files/archive.gz");
  const gzip = createGzip();

  try {
    await pipeline(source, gzip, destination);
  } catch (err) {
    console.error(err);
  }
};

await compress();
