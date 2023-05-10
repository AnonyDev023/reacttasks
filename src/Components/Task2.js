import React, { useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";

const Task2 = () => {

    const [task, setTask] = useState("")

    const [taskarray, setTaskarray] = useState([])

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    console.log(task)

    const handleSubmit = () => {
        setTaskarray([
            ...taskarray,
            task
        ])
        setTask("")
    }

    const handleDelete = (index) => {
        const newarr = [...taskarray]
        newarr.splice(index, 1)
        setTaskarray(newarr)
    }

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task2</h1>
                        <div className="todo-holder-div">
                            <div className="task-inp-holder-div">
                                <TextField fullWidth label="Enter Your Task" id="fullWidth" color={lightmode ? "error" : "primary"} onChange={(e)=>setTask(e.target.value)} value={task} />
                            </div>
                            <div className="todo-btn-holder-div">
                            <Button variant="contained" color="success" onClick={handleSubmit} disabled={!task.trim()}>
                                Submit
                            </Button>
                            <Button variant="contained" color="error" onClick={()=>setTask("")} disabled={!task.trim()}>
                                Reset
                            </Button>
                            </div>
                            <div className={lightmode ? "tasks-holder-div bg-div-dark-border" : "tasks-holder-div"}>
                                {taskarray.length===0 ? <h1 className={lightmode ? "no-task-h1 darkthemecolor" : "no-task-h1 lightthemecolor"}>No Task</h1> : taskarray.map((ele, i)=>{
                                    return (
                                        <div className="indi-task-holder-div" key={i}>
                                            <p className="task-p">{ele}</p>
                                            <div className="task-close-div" onClick={()=>handleDelete(i)}>
                                                <i class="fa fa-close"></i>
                                            </div>
                                        </div>
                                    )
                                })}
                                {taskarray.length!==0 ? <div className="tasks-all-reset-div">
                                    <Button variant="contained" color="error" onClick={()=>setTaskarray([])}>
                                        Reset Tasks
                                    </Button>
                                </div> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task2;