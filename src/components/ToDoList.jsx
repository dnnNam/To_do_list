import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    "Eat BreakFast",
    "Take a shower",
    "Walk a dog",
  ]);

  //  setTasks thay đổi tasks
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (
      newTask.trim() !== "" // không cho bỏ trống khi bấm add ko thêm
    ) {
      setTasks((t) => [...tasks, newTask]);
      // hàm task là hàm dùng để cập nhập trạng thái tasks (giả định khai báo useState)
      // t là tham số của callBack , chính là giá trị hiện tại của task
      // thay vì viết setTasks[...tasks , newTask] dùng callBack để đảm bảo
      // trạng thái luôn được cập nhập chính xác trong trường hợp có nhiều cập nhập
      // nếu không dùng callback thì sợ react không kịp cập nhập trạng thái
      setNewTask("");
      // reset giá trị về chuỗi rỗng , thường để làm trống input sau khi thêm task mới
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((item, i) => i !== index);
    // lọc ra những đứa không bị xóa
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1> To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task...."
          value={newTask}
          onChange={handleInputChange}
        />

        <button className="add-btn" onClick={addTask}>
          ADD
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              delete
            </button>

            <button className="move-btn" onClick={() => moveTaskUp(index)}>
              👆
            </button>
            <button className="move-btn" onClick={() => moveTaskDown(index)}>
              👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
