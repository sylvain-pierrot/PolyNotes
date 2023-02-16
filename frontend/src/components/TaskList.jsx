import TaskForm from './TaskForm'
import Task from './Task'
import { useState, useEffect } from 'react'

function TaskList(props) {
 
    // init state
    const [tasks, setTasks] = useState([])

    // handlers
    const addTask = (newTask) => {
        setTasks(tasks => [...tasks, newTask])
    }

    // effects
    // fetching data fot the todo list
    useEffect(() => {
        fetch("http://localhost:3001/tasks")
        .then(resp => resp.json())
        .then(data => setTasks(data.map(t => t.title)))
    }, [])

    // return UI
    return (
        <div style={{display: 'inline-block'}}>
            <h2>{props.name}</h2>
            <ul>
                {tasks.map(t => <Task title={t}/>)}
            </ul>
            <TaskForm handleClick={addTask}/>
        </div>
    )
}

export default TaskList