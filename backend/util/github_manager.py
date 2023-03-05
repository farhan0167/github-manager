import os

class Github:

    def git_clone(self, remote):
        cmd = f"git clone {remote}"
        try:
            os.system(cmd)
            return 1
        except:
            return 0
        
    def create_new_repo(self,remote):
        commands = [
            "echo '# Repo README' >> README.md",
            "git init",
            "git add README.md",
            "git add .",
            "git commit -m 'first commit'",
            "git branch -M main",
            f"git remote add origin {remote}",
            "git push -u origin main",
        ]
        try:
            for cmd in commands:
                os.system(cmd)
            return 1
        except:
            return 0
    
    def push_changes_to_github(self, message):
        commands = [
            "git add .",
            f"git commit -m '{message}'",
            "git push origin"
        ]
        try:
            for cmd in commands:
                os.system(cmd)
            return 1
        except:
            return 0

