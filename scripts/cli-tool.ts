import readline from "readline";
import { addOrUpdateKey, getKeys, newEnvironment, removeKey } from "../src/vault";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const primaryQuestion = `
What do you want to do?
1: Add or upate a key
2: Remove a key
3: Get keys
4: Create a new environment
Please enter the option number: `;

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
};

export const main = async () => {
  const action = await askQuestion(primaryQuestion);

  if (action === "1") {
    const theKey = await askQuestion("Key: ");
    const theValue = await askQuestion("Value: ");
    const theEnv = await askQuestion("Environment: ");
    addOrUpdateKey(theKey, theValue, theEnv);
  } else if (action === "2") {
    const theKey = await askQuestion("Key: ");
    const theEnv = await askQuestion("Environment: ");
    removeKey(theKey, theEnv);
  } else if (action === "3") {
    const theEnv = await askQuestion("Environment: ");
    const keys = getKeys(theEnv);
    console.log(keys);
  } else if (action === "4") {
    var addMore = await askQuestion("Do you want to add keys and values? (yes/no): ");
    var theDict = {};
    while (addMore != "no") {
      const theKey = await askQuestion("Key: ");
      const theValue = await askQuestion("Value: ");
      theDict = { ...theDict, [theKey.toUpperCase()]: theValue };
      addMore = await askQuestion("Do you want to add more keys and values? (yes/no): ");
    }
    const theEnv = await askQuestion("New environment: ");
    newEnvironment(theDict, theEnv);
  } else {
    console.log("Invalid option");
  }

  rl.close();
};

main();
