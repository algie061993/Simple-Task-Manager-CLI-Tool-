const fs = require("fs");

const command = process.argv[2];
const argument = process.argv[3];

// FUNCTION 1: Reads tasks from the JSON file and turns them back into a JS Array
function getTasks() {
  // 1. Read the raw text from the file
  const fileContents = fs.readFileSync("tasks.json", "utf-8");
  // 2. Turn that text back into a real JavaScript Array
  return JSON.parse(fileContents);
}

// FUNCTION 2: Takes a JS Array and saves it as text inside the JSON file
function saveTasks(tasksArray) {
  // 1. Turn the array into clean, formatted text
  const textData = JSON.stringify(tasksArray, null, 2);
  // 2. Write that text into the file
  fs.writeFileSync("tasks.json", textData);
}
// FUNCTION 3: Creates a new task object and adds it to our list
function addTask(taskDescription) {
  if (!taskDescription) {
    console.log(
      'Error: Please provide a task description! Example: node index.js add "Water plants"',
    );
    return;
  }

  // 1. Get the current list of tasks
  const currentTasks = getTasks();

  // 2. Create a brand new task object
  const newTask = {
    id: currentTasks.length + 1, // Simple ID generation
    description: taskDescription,
    completed: false,
  };

  // 3. Push our new object into the array
  currentTasks.push(newTask);

  // 4. Save the updated array back to the file
  saveTasks(currentTasks);
  console.log(`Success! Added: "${taskDescription}"`);
}

// FUNCTION 4: Loops through the list and prints them nicely
function listTasks() {
  const currentTasks = getTasks();

  if (currentTasks.length === 0) {
    console.log("Your todo list is totally empty! Use 'add' to create a task.");
    return;
  }

  console.log("\n--- YOUR TASK LIST ---");
  // Use a loop to inspect every task object in our array
  for (let i = 0; i < currentTasks.length; i++) {
    const task = currentTasks[i];

    // Decide what checkbox to print based on the boolean value
    let statusCheckbox = "[ ]";
    if (task.completed === true) {
      statusCheckbox = "[X]";
    }

    console.log(`${task.id}. ${statusCheckbox} ${task.description}`);
  }
  console.log("----------------------\n");
}
// FUNCTION 5: Finds a task by its ID and marks it completed
function completeTask(taskIdString) {
  if (!taskIdString) {
    console.log(
      "Error: Please provide the ID number of the task. Example: node index.js complete 1",
    );
    return;
  }

  // 1. Convert the input text (like "2") into a real number (2)
  const idToFind = Number(taskIdString);

  // 2. Grab our current array of tasks
  const currentTasks = getTasks();

  // 3. Create a tracker variable to see if we actually found the task
  let taskFound = false;

  // 4. Loop through the array to find the object with the matching ID
  for (let i = 0; i < currentTasks.length; i++) {
    if (currentTasks[i].id === idToFind) {
      // Found it! Change its completed status to true
      currentTasks[i].completed = true;
      taskFound = true;
      break; // Stop looping early since we found our match
    }
  }

  // 5. Check if we actually found the task or if the user typed a bad ID
  if (taskFound === true) {
    saveTasks(currentTasks); // Save our modified array back to the file
    console.log(`Success! Task #${idToFind} has been marked as completed.`);
  } else {
    console.log(`Error: Could not find a task with the ID of ${idToFind}`);
  }
}
// THE CONTROLLER: Updated to handle the 'complete' command
if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "complete") {
  // Here, the 'argument' will be the ID number you typed (like "1" or "2")
  completeTask(argument);
} else {
  console.log("Available commands:");
  console.log('  node index.js add "your task name"  <- Adds a task');
  console.log("  node index.js list                  <- Lists all tasks");
  console.log("  node index.js complete <id>         <- Completes a task");
}
