import subprocess
import threading
import time
import os

def startReact():
    print("Starting React")
    path = os.getcwd()+"/my-app"
    print("React Server running...")
    while True:
        subprocess.run(['npm','start'], capture_output=True, cwd=path)
def startFlask():
    print("Starting Flask")
    path = os.getcwd()+"/backend/"
    venv_path = os.getcwd()+"/backend/venv"
    # Set the environment variables to use the virtual environment
    env = {
        'VIRTUAL_ENV': venv_path,
        'PATH': f"{venv_path}/bin:{os.environ['PATH']}"
    }

    # Run the command to activate the virtual environment and start the Flask server in the same shell process
    print("Flask Server running....")
    while True:
        subprocess.run(['python3', 'app.py'], capture_output=True, env=env, cwd=path)


Thread1 = threading.Thread(target=startReact)
Thread2 = threading.Thread(target=startFlask)

Thread1.start()
Thread2.start()
