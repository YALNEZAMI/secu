"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Entities_1 = require("./Entities");
const app = express();
const port = 3000;
// const file1 = new Fichier("file1", "txt", 10, [Permission.Read]);
// const file2 = new Fichier("file2", "txt", 20, [Permission.Exec]);
// console.log(file1);
// console.log(rep1);
app.get("/", (req, res) => {
    res.send("Hello My World!");
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    const rep1 = new Entities_1.Repertoire("rep1", "./src/test", 0, [], []);
    yield rep1.clone();
    // console.log(rep1.printFileWithSizeEqualNul());
    // console.log(rep1);
    console.log(`app listening on port ${port}`);
}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMseUNBQTZEO0FBRzdELE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixvRUFBb0U7QUFDcEUsb0VBQW9FO0FBRXBFLHNCQUFzQjtBQUN0QixxQkFBcUI7QUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7SUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBUyxFQUFFO0lBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUkscUJBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0QsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsaURBQWlEO0lBQ2pELHFCQUFxQjtJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCwyQkFBMkI7QUFDM0IsbURBQW1EO0FBQ25ELG9CQUFvQjtBQUNwQixNQUFNO0FBQ04sd0JBQXdCO0FBQ3hCLGdEQUFnRDtBQUNoRCw2QkFBNkI7QUFDN0IsTUFBTTtBQUVOLHNDQUFzQztBQUN0QywyQkFBMkI7QUFDM0IsTUFBTTtBQUNOLDBDQUEwQztBQUMxQywrQkFBK0I7QUFDL0IsTUFBTSJ9