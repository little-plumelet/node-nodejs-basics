import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
const decompress = async () => {
  const source = createReadStream("src/zip/files/archive.gz");
  const destination = createWriteStream("src/zip/files/fileToCompress.txt");
  const gunzip = createGunzip();

  try {
    await pipeline(source, gunzip, destination);
  } catch (err) {
    console.error(err);
  }
};

await decompress();
