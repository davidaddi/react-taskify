import {useState} from 'react';

export default function Form({ tasks, setTasks }) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (inputValue.trim() === '') {
        setError('Veuillez entrer quelque chose.');
        return;
      }
  
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: (prevTasks.length + 1).toString().padStart(2, '0'), name: inputValue, completed: false },
      ]);
  
      setInputValue('');
      setError('');
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      setError('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="taskForm">
        <input
          type="text"
          name="task"
          placeholder="Wash the dishes ..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>Add Task</button>
        
        {error && (
          <div className="errorContainer">
            <p className="errorText">{error}</p>
          </div>
        )}
      </form>
  
    );
  }