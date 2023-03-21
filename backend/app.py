from flask import Flask, request
from flask_cors import CORS
from util.file_manager import FileManager
from util.github_manager import Github
import os


app = Flask(__name__)
CORS(app)
#initialize file manager
root_path = os.getcwd()+'/Projects'
file_manager = FileManager(root=root_path)
github_manager = Github()

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
#create directory
@app.route("/mkdir/<dir_name>")
def mkdir(dir_name):
    cur_dir = file_manager.cur_dir
    mkdir_status = file_manager.mkdir(dir_name)
    return {
            "message": file_manager.list_directory(cur_dir),
            "cur_dir": file_manager.cur_dir,
            "root_dir": file_manager.root,
            "success": mkdir_status
        }

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
#launch browser
@app.route("/launch-browser")
def launchBrowser():
    cur_dir = file_manager.cur_dir
    try:
        file_manager.launchBroswerWindowAtPath(cur_dir)
        return {
            "message": "success"
        }
    except:
        return {
            "message": "failure"
        }
#launch terminal
@app.route("/launch-terminal")
def launchTerminal():
    try:
        file_manager.launchTerminalAtPath()
        return {
            "message": "success"
        }
    except:
        return {
            "message": "failure"
        }
#launch vscode:
@app.route('/launch-vscode')
def vsCodeLaunch():
    try:
        file_manager.launchCodeEditor()
        return {
            "message": "success"
        }
    except:
        return {
            "message": "failure"
        }
#clone a repo:
@app.route('/clone', methods=['POST'])
def clone_git_repo():
    req = request.get_json()
    remote = req['remote']
    cur_dir = file_manager.cur_dir
    clone_status = github_manager.git_clone(remote)
    if clone_status:
        return {
            "message": file_manager.list_directory(cur_dir),
            "cur_dir": file_manager.cur_dir,
            "root_dir": file_manager.root,
            "success": clone_status
        }
    return {
        "message": file_manager.list_directory(cur_dir),
        "cur_dir": file_manager.cur_dir,
        "root_dir": file_manager.root,
        "success": clone_status
    }


#make first commit to remote repo
@app.route('/create-repo', methods=['POST'])
def create_first_repo():
    req = request.get_json()
    remote = req['remote']
    cur_dir = file_manager.cur_dir
    git_status = github_manager.create_new_repo(remote)

    return {
        "message": file_manager.list_directory(cur_dir),
        "cur_dir": file_manager.cur_dir,
        "root_dir": file_manager.root,
        "success": git_status
    }

#commit changes options-[all, select folders]
@app.route('/push-changes', methods=["POST"])
def push_changes_to_git():
    req = request.get_json()
    commit_message = req['commit_message']
    #cur_dir = file_manager.cur_dir
    push_status = github_manager.push_changes_to_github(commit_message)
    return {
        'message': push_status
    }
#check git status
#pull changes

#integrate netlify
#integrate heroku

if __name__ == "__main__":
    app.run(host='localhost', port=8009, debug=True)