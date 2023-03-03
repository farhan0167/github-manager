from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

#get cur directory files/folders
#navigate to a folder
#go back a folder

#make first commit to remote repo
#commit changes options-[all, select folders]
#check git status
#pull changes

#integrate netlify
#integrate heroku

if __name__ == "__main__":
    app.run(host='localhost', port=8000)