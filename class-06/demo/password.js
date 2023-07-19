"use strict";
// two new libraries
const base64 = require("base-64");
const bcrypt = require("bcrypt");

console.log("------------------------ base 64 --------------------------");

// encode using base 64 - can be decoded
let str = "I love pizza";
let encodedStr = base64.encode(str);
console.log(encodedStr);
let decodedStr = base64.decode(encodedStr);
console.log(decodedStr);

// we use the base64 encoded string in the Basic Auth for the req header
// basic auth string: Basic <some encoded value>
// the encoded value username:password
// headers: {
//   Authorization: Basic jfhalkuhfksjdhflaksdjfh
// }

// example of a basic auth header

let userAndPass = "MJ:BarkyBark";
const justThePassword = "BarkyBark";
let encodedUserAndPass = base64.encode(userAndPass);
console.log({ encodedUserAndPass });
// recive Basic jfhalkuhfksjdhflaksdjfh
// server side portion
// get the part that is encoded
// decode it
// split(":")[1]
// split(":")[0]
// encrypt the password

// client side behavior
// auth string comes in from the client
let authStr = `Basic ${encodedUserAndPass}`;

// To securly store data in the db we need it to be more safe - can't be decoded
// it comes in encoded, we will decode it and store safely or check against what we have stored

const encrypt = async (password) => {
  let hash = await bcrypt.hash(password, 5);
  // let resultOne = await bcrypt.compare(password, hash);
  const oneOfMJsHashsThatWeCopied =
    "$2b$05$E7Pwlq/8Q2LPt8zjMMpx7O/a6pXXHod06xyEsqfHesRQXwJPcuPQq";
  let resultMJ = await bcrypt.compare(
    password,
    "$2b$05$E7Pwlq/8Q2LPt8zjMMpx7O/a6pXXHod06xyEsqfHesRQXwJPcuPQq"
  );
  // console.log(resultOne);
  console.log(resultMJ);
};

console.log("--------------------- bcrypt --------------------");

const encryptedPW = encrypt("BarkyBark");
const justTheUser = "MJ";

// in our user model we would have something like this
console.log({ name: justTheUser, password: encryptedPW });
// go to db with username, retrieve the entry, compare the password... if it checks out they are who the say they are, otherwise YOU SHALL NOT PASS
