# Task Manager

A simple command-line task manager built with Node.js.

## Installation

```bash
npm install
```

## Usage

```bash
node index.js add "Task description"    # Add a new task
node index.js list                        # List all tasks
node index.js complete <id>               # Mark a task as completed
```

## Commands

- `add "task"` - Adds a new task with the given description
- `list` - Displays all tasks with their status (completed/incomplete)
- `complete <id>` - Marks a task as completed by its ID number

## Task Format

Tasks are stored in `tasks.json` with the following structure:

```json
[
  {
    "id": 1,
    "description": "Task description",
    "completed": false
  }
]
```

## Example

```bash
$ node index.js add "Water the plants"
Success! Added: "Water the plants"

$ node index.js list

--- YOUR TASK LIST ---
1. [ ] Learn Node.js variables
2. [ ] Feed the cat
3. [ ] Water the plants
----------------------
```

## Requirements

- Node.js (no external dependencies required)