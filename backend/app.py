from flask import Flask
from flask_cors import CORS
from util.file_manager import FileManager
import os

app = Flask(__name__)
CORS(app)
#initialize file manager
file_manager = FileManager(root=os.getcwd())

#get root directory files/folders
@app.route("/")
def root():
    root_path = file_manager.get_root_dir()
    file_manager.change_cur_dir(root_path)

    return {
        "message": file_manager.list_directory(root_path),
        "cur_dir": file_manager.cur_dir,
        "root_dir": file_manager.root
        }

#get cur directory files/folder

#navigate to a folder
@app.route("/forward-nav/<dir>")
def forward_nav(dir):
    root_path = file_manager.get_root_dir()
    cur_dir = file_manager.change_cur_dir(dir)

    return {
        "cur_dir": cur_dir,
        "root_dir": root_path,
        "message": file_manager.list_directory(cur_dir)
        }

#go back a folder
@app.route("/backward/<path:subpath>")
def backward_nav(subpath):
    root_path = file_manager.get_root_dir()
    cur_dir = file_manager.navbypath(subpath)
    return {
       "cur_dir": cur_dir,
        "root_dir": root_path,
        "message": file_manager.list_directory(cur_dir) 
    }
#make first commit to remote repo
#commit changes options-[all, select folders]
#check git status
#pull changes

#integrate netlify
#integrate heroku

if __name__ == "__main__":
    app.run(host='localhost', port=8000, debug=True)