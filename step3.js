"use strict";

const fsP = require("fs/promises");
const argv = process.argv;
const axios = require("axios");

/** Takes as input a string for a file path, reads that file and prints content. */

async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
  return contents;
}

/** Take as input a string (URL), reads and prints first 80 characters */

async function webCat(url) {
  let resp;
  try {
    resp = await axios.get(url);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
  return resp.data.slice(0, 80);
}

async function writeOutput(path, content) {
  try {
    await fsP.writeFile(path, content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function catOrWebCat(filePath) {
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return await webCat(filePath);
  } else {
    return await cat(filePath);
  }
}

async function printContent() {
  if (argv[2] === "--out") {
    const outfilePath = `./${argv[3]}`;
    const filePath = argv[4];
    const content = await catOrWebCat(filePath);
    writeOutput(outfilePath, content);
  } else {
    console.log(await catOrWebCat(argv[2]));
  }
}

printContent();
