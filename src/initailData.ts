import fs from "fs";
import bcrypt from "bcrypt";
import User from "./models/usersModel"; // Your User model
import Terror from "./models/terrorismModel";

/**
 * Encrypts passwords for all users in the provided data array.
 * @param userData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
async function encryptPasswords(userData: any[]) {
  return Promise.all(
    userData.map(async (user) => {
      if (user.password) {
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(user.password, 10);
      }
      return user;
    })
  );
}
console.log(2);

async function loadInitialData() {
  const userData = JSON.parse(fs.readFileSync("../data/users.json", "utf8"));
  console.log(1);

  const terrorData = JSON.parse(
    fs.readFileSync("../data/terrorism.json", "utf8")
  );
  console.log(2);

  // Check if the database is empty
  if ((await User.countDocuments()) === 0) {
    console.log(3);

    // Encrypt passwords before inserting into the database
    const encryptedUserData = await encryptPasswords(userData);
    await User.insertMany(encryptedUserData);
    console.log("Initial users have been added to the database.");
  } else {
    console.log(4);
    console.log("Users already exist in the database.");
  }

  if ((await Terror.countDocuments()) === 0) {
    await Terror.insertMany(terrorData);

    console.log("Initial terrorism have been added to the database.");
  } else {
    console.log("terrorism already exist in the database.");
  }
}

export default loadInitialData;
