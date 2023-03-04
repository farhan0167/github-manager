import React, {useState, useEffect} from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import '../index.css'

export const DirectoryFiles = () => {
    const [data,setData] = useState(null)
    
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
        })
    }
    function handleClickRoot(){
        fetch('http://localhost:8000/')
        .then(res=> res.json())
        .then(data_res => {
            setData(data_res)
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
    
    useEffect(() => {
      fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data_res => {
        setData(data_res)
        console.log(data_res)
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
            <Button variant='success' onClick={addFolder}>Add Folder</Button>
        </div>
        <ListGroup>
            {data? (
                
                data.message.map(item =>(
                    <ListGroup.Item action key={item} onClick={()=> handleClick(item)}>{item}</ListGroup.Item>
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

*/