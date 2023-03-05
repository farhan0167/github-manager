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

export const DirectoryFiles = () => {
    const [data,setData] = useState(null)
    const [curDir, setCurDir] = useState(null)
    
    function handleClick(item){
        if (item.includes(".")){
            alert("Not a directory. You can only click directories")
            return
        }
        const req_url = 'http://localhost:8000/forward-nav/'+item
        fetch(req_url)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
            setCurDir(data_res.cur_dir)
        })
    }
    function handleClickRoot(){
        fetch('http://localhost:8000/')
        .then(res=> res.json())
        .then(data_res => {
            setData(data_res)
            setCurDir(data_res.cur_dir)
        })
    }
    function addFolder(){
        const dir_name = prompt("Enter Folder Name:")
        if (dir_name === '' || dir_name == null){
            alert("Enter a valid Folder Name")
            return
        }
        fetch('http://localhost:8000/mkdir/'+dir_name)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
        })
    }
    function openFinder(){
        const path = curDir
        fetch("http://localhost:8000/launch-browser"+path)
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }
    function openTerminal(){
        fetch("http://localhost:8000/launch-terminal")
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }
    function openCodeEditor(){
        fetch("http://localhost:8000/launch-vscode")
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
        fetch('http://localhost:8000/clone/'+remote_repo)
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
        fetch('http://localhost:8000/create-repo/'+remote_repo)
        .then(res => res.json())
        .then(data_res => {
            setData(data_res)
        })
    }

    
    useEffect(() => {
      fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data_res => {
        setData(data_res)
        setCurDir(data_res.cur_dir)
        //console.log(data_res)
      })
    }, [])
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
            <Dropdown style={{'marginLeft':'10px'}}>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Github Actions  <GitHubIcon/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={makeFirstCommit}>First Commit  <CloudUploadIcon/></Dropdown.Item>
                    <PushChangesGit data={data}/>
                </Dropdown.Menu>
            </Dropdown>
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
                        <ListGroup.Item action onClick={()=> handleClick(item)}>
                            {item}
                        </ListGroup.Item>
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