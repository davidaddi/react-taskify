import { useState, useEffect } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);

    // Load tasks from local storage when component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to local storage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const deleteTask = (taskId) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task.id !== taskId);
            // Adjust the IDs of the remaining tasks
            return updatedTasks.map((task, index) => ({
                ...task,
                id: (index + 1).toString().padStart(2, '0') // Add leading zero if necessary
            }));
        });
    };

    return (
        <div id="app">
            <Header />
            <Form tasks={tasks} setTasks={setTasks} />
            <Receipt tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
}

function Receipt({ tasks, deleteTask }) {
    return (
        <div className="receipt">
            <ReceiptHeader />
            <TaskList tasks={tasks} deleteTask={deleteTask} />
            <ReceiptFooter />
        </div>
    );
}


function ReceiptHeader() {
    return (
        <div className="receiptHeader">
            <h1>TODO LIST</h1>
            <span>For Today</span>
        </div>
    );
}

function TaskTableHeader() {
    return (
        <thead>
        <tr>
            <th className="column-header">TSK</th>
            <th className="column-header long-column">ITEM</th>
            <th className="column-header">DNE</th>
        </tr>
        </thead>
    )
}

function TaskTableBody({ tasks, deleteTask }) {
    return (
        <tbody>
        {tasks.map((task) => (
            <Task key={task.id} id={task.id} name={task.name} completed={task.completed} deleteTask={deleteTask} />
        ))}
        </tbody>
    );
}

function TaskTableFooter({ tasks }) {
    const taskCount = tasks.length;

    return (
        <tfoot>
        <tr>
            <th className="column-footer">TOTAL</th>
            <th colSpan="2" className="column-footer column-footer-lg">{taskCount}</th>
        </tr>
        </tfoot>
    );
}


function TaskList({ tasks, deleteTask }) {
    return (
        <div className="ticket-container">
            <table className="ticket-table">
                <TaskTableHeader />
                <TaskTableBody tasks={tasks} deleteTask={deleteTask} />
                <TaskTableFooter tasks={tasks} />
            </table>
        </div>
    );
}


function Task({ id, name, completed: initialCompleted, deleteTask }) {
    const [completed, setCompleted] = useState(initialCompleted);

    const handleCheckboxChange = (e) => {
        setCompleted(e.target.checked);
    }

    const handleDeleteClick = () => {
        deleteTask(id);
    }

    return (
        <tr>
            <td style={{textDecoration: completed ? 'line-through' : 'none'}} onClick={handleDeleteClick}>{id}</td>
            <td className="item-name" style={{textDecoration: completed ? 'line-through' : 'none'}} onClick={handleDeleteClick}>{name}</td>
            <td>
                <input type="checkbox" checked={completed} onChange={handleCheckboxChange} />
            </td>
        </tr>
    );
}

function ReceiptFooter() {
    const code = Math.floor(10000 + Math.random() * 90000);

    return (
        <>
            <div className="codes">
                <h4>CARD NUM : **** **** **** 1881</h4>
                <h4>TRANSACTION CODE : {code}</h4>
            </div>
            <div className="receiptFooter">
                <h4>THANKS FOR YOUR VISIT</h4>
                <img src="./barcode.png" alt="" />
            </div>
        </>
    )
}

export default App;
