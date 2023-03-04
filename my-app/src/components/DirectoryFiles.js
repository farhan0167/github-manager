import React, {useState, useEffect} from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import '../index.css'
import LaunchIcon from '@mui/icons-material/Launch';
import TerminalIcon from '@mui/icons-material/Terminal';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

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
        if (dir_name === ''){
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
            <Button variant='success' onClick={addFolder}>Add Folder  <CreateNewFolderIcon/></Button>
            <Button onClick={openFinder} style={{'marginLeft':'10px'}} size='md' variant="outline-primary">
                Open Window  <LaunchIcon size='15'/>
            </Button>
            <Button onClick={openTerminal} style={{'marginLeft':'10px'}} size='md' variant="outline-secondary">
                Launch Terminal  <TerminalIcon size='15'/>
            </Button>
        </div>
        <ListGroup>
            {data? (
                
                data.message.map(item =>(
                    <div style={{'display':'flex'}}>
                        <ListGroup.Item action key={item} onClick={()=> handleClick(item)}>
                            {item}
                        </ListGroup.Item>
                        {/*<div style={{'display':'flex'}}>
                            <Button size='sm' variant="outline-primary">
                                <LaunchIcon size='15'/>
                            </Button>
                            <Button size='sm' variant="outline-danger">
                                <TerminalIcon size='15'/>
                            </Button>
                </div>*/}
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