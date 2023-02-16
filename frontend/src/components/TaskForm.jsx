import { useState } from "react"

function TaskForm(props) {

    // init state
    const [newTask, setNewTask] = useState('')

    // event handlers
    const submit = () => {
        props.handleClick(newTask)
        setNewTask('')
    }
    const handleChange = (event) => setNewTask(event.target.value)

    return (
        <div>
            <input name="newTask" onChange={handleChange} value={newTask}/>
            <input type="submit" onClick={submit} />
        </div>
    )
}

export default TaskForm