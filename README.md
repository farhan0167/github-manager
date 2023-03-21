# github-manager

## Problem Statement:
As a developer, managing multiple projects across different directories can be time-consuming and tedious. Additionally, writing out git commands to push code can be error-prone and distract from the actual coding process. These inefficiencies can slow down the development process and hinder productivity.

To address these issues, I have developed a file manager application that streamlines the application development procedure on Github. This application provides a centralized location to organize all of your projects and offers the ability to launch code editors and terminals with just a few clicks. This allows developers to easily navigate and work on their projects without the hassle of searching through multiple directories.

Furthermore, this app abstracts away writing git commands by providing a simple and intuitive interface for pushing code. With just a single click, developers can push their code to Github without worrying about the specifics of the command-line interface. This application aims to enhance productivity and streamline the development process for developers of all levels.

## Getting Started:
This is currently a work in progress. The current version can be thought of as a file manager application.
In order to run the repository to see current progress, follow the steps:
1. Clone this repo:
   ```bash
   git clone https://github.com/farhan0167/github-manager.git
   ```
2. Go inside the folder:
   ```bash
   cd github-manager/backend
   ```
3. Install virtual env:
   ```bash
   python3 -m venv venv
   ```
   Make sure you install venv in the backend folder
4. Activate the venv:
   ```bash
   source vevn/bin/activate
   ```
5. Install all the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

6. Once all the dependencies are installed, you can choose to either stay in the venv or deactivate it, because
   now we'll run the `startup-script.py` file.
   1. Go back to the main directory where the `startup-script.py` file is
   2. Run the `startup-script.py` file
      ```bash
      python3 startup-script.py
      ```
      This will start both a React and Flask server running on multiple threads.

## Technical Details

The Flask application initializes two Objects- The File Manager and Github object. 
1. [File Manager](https://github.com/farhan0167/github-manager/blob/main/backend/util/file_manager.py):
      The file manager class keeps track of the root and current directory. Users can:
      1. See the files of the current directory
      2. Navigate within directories
      3. Launch terminal windows, VS Code and finder windows
      These are made possible by leveraging the OS module provided by python.

2. [Github Manager](https://github.com/farhan0167/github-manager/blob/main/backend/util/github_manager.py):
   The github class handles all github related functions:
   1. Creating a git repository
   2. Cloning a git repository
   3. Pushing changes to a remote git repository