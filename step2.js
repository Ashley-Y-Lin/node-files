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
  console.log(contents);
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
  console.log(resp.data.slice(0, 80), "...");
}

filePath = argv[2];

if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
  webCat(filePath);
} else {
  cat(filePath);
}