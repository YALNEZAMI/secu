const express = require("express");
import { Fichier, Permission, Repertoire } from "./Entities";
import * as fs from "fs";

const app = express();
const port = 3000;
// const file1 = new Fichier("file1", "txt", 10, [Permission.Read]);
// const file2 = new Fichier("file2", "txt", 20, [Permission.Exec]);

// console.log(file1);
// console.log(rep1);
app.get("/", (req: any, res: any) => {
  res.send("Hello My World!");
});

app.listen(port, async () => {
  const rep1 = new Repertoire("rep1", "./src/test", 0, [], []);
  await rep1.clone();
  // console.log(rep1.printFileWithSizeEqualNul());
  // console.log(rep1);
  console.log(`app listening on port ${port}`);
});

// let content = undefined;
// fs.readFile("../dist/index.js", (err, data) => {
//   content = data;
// });
// console.log(content);
// fs.readFile("./dist/app.js", (err, data) => {
//   console.log("readFile");
// });

// fs.readdir("/tmp", (err, data) => {
//   console.error("/tmp");
// });
// fs.readdir("/usr/lib", (err, data) => {
//   console.error("/usr/lib");
// });
