import React, {useState, useEffect} from 'react'
import { ListGroup, Button, Dropdown } from 'react-bootstrap'
import '../index.css'
import LaunchIcon from '@mui/icons-material/Launch';
import TerminalIcon from '@mui/icons-material/Terminal';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CodeIcon from '@mui/icons-material/Code';
import { PushChangesGit } from './PushChangePop';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const DirectoryFiles = () => {
    const [data,setData] = useState(null)
    const [curDir, setCurDir] = useState(null)
    const [rootDir, setRootDir] = useState('')
    const [files, setFiles] = useState([])
    const backendServer = 'http://localhost:8009'
    
    function handleClick(item){
        if (item.includes(".")){
            alert("Not a directory. You can only click directories")
            return
        }
        const req_url = backendServer + '/forward-nav/'+item
        fetch(req_url)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
            setCurDir(data_res.cur_dir)
            setFiles(data_res.message)
        })
    }
    function handleClickRoot(){
        fetch(backendServer + '/')
        .then(res=> res.json())
        .then(data_res => {
            setData(data_res)
            setCurDir(data_res.cur_dir)
            setFiles(data_res.message)
        })
    }
    function addFolder(){
        const dir_name = prompt("Enter Folder Name:")
        if (dir_name === '' || dir_name == null){
            alert("Enter a valid Folder Name")
            return
        }
        fetch(backendServer + '/mkdir/'+dir_name)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
        })
    }
    function openFinder(){
        const path = curDir
        fetch(backendServer + "/launch-browser"+path)
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }
    function openTerminal(){
        fetch(backendServer + "/launch-terminal")
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }
    function openCodeEditor(){
        fetch(backendServer + "/launch-vscode")
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }
    function cloneRepo(){
        const remote_repo = prompt("Enter Remote Git Location:")
        if (remote_repo === ''){
            alert("Enter a valid Folder Name")
            return
        }
        fetch(backendServer + '/clone/'+remote_repo)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
        })
    }
    function makeFirstCommit(){
        const remote_repo = prompt("Enter Remote Git Location:")
        if (remote_repo === '' || remote_repo == null){
            alert("Enter a valid Git url")
            return
        }
        fetch(backendServer + '/create-repo/'+remote_repo)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
            setFiles(data_res.message)
        })
    }

    
    useEffect(() => {
      fetch(backendServer + '/')
      .then(res => res.json())
      .then(data_res => {
        setData(data_res)
        setCurDir(data_res.cur_dir)
        setRootDir(data_res.root_dir)
        setFiles(data_res.message)
        //console.log(data_res)
      })
    }, [])
    console.log(files)
  return (
    <React.Fragment>
        <ListGroup horizontal>
            <ListGroup.Item onClick={handleClickRoot}>root</ListGroup.Item>
            <ListGroup.Item>Projects</ListGroup.Item>
            <ListGroup.Item>Awesome App</ListGroup.Item>
        </ListGroup>
        <div className='util-func'>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Folder  <CreateNewFolderIcon/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={addFolder}>Add Folder  <CreateNewFolderIcon/></Dropdown.Item>
                    <Dropdown.Item onClick={cloneRepo}>Git Clone  <GitHubIcon/></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {//git operations not allowed in root directory
            curDir !== rootDir ? (
                <Dropdown style={{'marginLeft':'10px'}}>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        Github Actions  <GitHubIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        { //detect whether cur_dir already is a git repo, if not allow first commit
                        !files.includes('.git') ? (
                            <Dropdown.Item onClick={makeFirstCommit}>First Commit  <CloudUploadIcon/></Dropdown.Item>
                        ): <></>}
                        <PushChangesGit data={data}/>
                    </Dropdown.Menu>
                </Dropdown>
            ): <></>}
            
            <Button onClick={openFinder} style={{'marginLeft':'10px'}} size='md' variant="outline-primary">
                Open Window  <LaunchIcon size='15'/>
            </Button>
            <Button onClick={openTerminal} style={{'marginLeft':'10px'}} size='md' variant="outline-secondary">
                Launch Terminal  <TerminalIcon size='15'/>
            </Button>
            <Button onClick={openCodeEditor} style={{'marginLeft':'10px'}} size='md' variant="outline-secondary">
                Launch Code Editor  <CodeIcon size='15'/>
            </Button>
            
        </div>
        <ListGroup>
            {data? (
                
                data.message.map(item =>(
                    <div key={item} style={{'display':'flex'}}>
                        {item.includes(".") ? (
                            <ListGroup.Item action onClick={()=> handleClick(item)}>
                                <InsertDriveFileIcon sx={{ color: '#D7D7D7'}}/>   {item}
                            </ListGroup.Item> 
                        ): (
                            <ListGroup.Item action onClick={()=> handleClick(item)}>
                                <FolderIcon sx={{ color: '#A4D2F4'}}/>  {item}
                            </ListGroup.Item>
                        )}
                    </div>

                ))
            ): (
                <p>Loading....</p>
            )}
        </ListGroup>
    </React.Fragment>
  )
}

/*

{
    cur_dir: "/Users/farhanishraq/Downloads/Projects/GithubMan/main-dev/backend/Projects",
    root_dir: "/Users/farhanishraq/Downloads/Projects/GithubMan/main-dev/backend"
}
if cur_dir == root_dir:
    do nothing
else:
    temp = root_dir #"/Users/farhanishraq/Downloads/Projects/GithubMan/main-dev/backend"
    cur_dir_list = cur_dir.split("/") -> [Users,farhanishraq,Downloads,Projects,GithubMan, main-dev, backend, Projects]

    for every element starting after backend until end of array:
        attach temp+'/'+element
<div style={{'display':'flex'}}>
                            <div>
                                {item}
                            </div>
                            <div>
                                <LaunchIcon/>
                            </div>
                        </div>
*/