import os

class FileManager:

    def __init__(self,root):
        self.root = root
        self.cur_dir = root #pointer to track current directory
    
    def get_root_dir(self):
        return self.root
    
    def change_cur_dir(self,path):
        """
        Given a directory, cd in the directory
        return the directory path
        """
        if path == self.root:
            os.chdir(path)
            self.cur_dir = path
            return path
        forward_path = self.cur_dir+'/'+path
        os.chdir(forward_path)
        self.cur_dir = forward_path
        return forward_path
    
    def navbypath(self,path):
        """
        Given a path, cd in the path
        return the directory path
        """
        path = '/'+path
        os.chdir(path)
        self.cur_dir = ''
        self.cur_dir = path
        return path


    def list_directory(self, path):
        file_list = os.listdir(path)
        return file_list
