# github-manager

The goal is to create an application, where you can manage your local git repositories. You can:
1. Create a repo on github, and then simply just hit a button to take your project on to github.
2. Pushing changes will be as simple as clicks of buttons
3. Once the above is complete, then we move on to:
   1. Netlify integration: Create a similar "Deploy to Netlify" button to easily deploy to netlify
   2. If your project has a backend, create a "Deploy to Heroku" button to easily deploy to Heroku
   3. Both the above functionalities would abstract away the configuration burden

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