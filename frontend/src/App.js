import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Todo from "./components/Todo";
import Swal from "sweetalert2";
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERROR ", err);
      });
  };
  const createTasks = (task) => {
    axios
      .post("http://localhost:5000/tasks", task)
      .then((newTask) => {
        let update = tasks;
        update.push(newTask.data);
        setTasks([...update]);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };
  const deleteTasks = (id, index) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        let update = tasks;
        update.splice(index, 1);
        setTasks([...update]);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };
  const updateTasks = (id, index) => {
    axios
      .put(`http://localhost:5000/tasks/${id}/true`)
      .then(() => {
        let update = tasks;
        update[index].isCompleted = true;
        setTasks([...update]);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };
  const handleSubmit = () => {
    const title = document.getElementById("title");
    createTasks({ title: title.value, isCompleted: complete });
    title.value = "";
    showPrompt(false);
  };
  const showPrompt = (show) => {
    show
      ? (document.getElementById("myModal").className += " is-active")
      : (document.getElementById("myModal").className = "modal");
  };
  return (
    <section className="hero is-fullheight has-text-centered">
      <div className="hero-header mt-6">
        <h1 className="title">To Do App</h1>
      </div>
      <div className="hero-body columns is-align-items-flex-start is-justify-content-space-evenly">
        <div
          className="column is-3 has-background-white-ter"
          style={{ borderRadius: "15px", position: "relative" }}
        >
          <h2 className="subtitle">To Do</h2>
          <button
            className="button is-primary is-fullwidth mb-5"
            onClick={() => {
              setComplete(false);
              showPrompt(true);
            }}
          >
            +
          </button>
          {tasks.map((task, index) => {
            if (!task.isCompleted) {
              return (
                <Todo
                  key={task._id}
                  task={task}
                  index={index}
                  updateTasks={updateTasks}
                  deleteTasks={deleteTasks}
                />
              );
            }
          })}
        </div>
        <div
          className="column is-3 has-background-white-ter"
          style={{ borderRadius: "15px", position: "relative" }}
        >
          <h2 className="subtitle">Done</h2>
          <button
            className="button is-primary is-fullwidth mb-5"
            onClick={() => {
              setComplete(true);
              showPrompt(true);
            }}
          >
            +
          </button>
          {tasks.map((task, index) => {
            if (task.isCompleted) {
              return (
                <Todo
                  key={task._id}
                  task={task}
                  index={index}
                  updateTasks={updateTasks}
                  deleteTasks={deleteTasks}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create new task</p>
          </header>
          <section className="modal-card-body">
            <input
              className="input is-success"
              id="title"
              type="text"
              placeholder="Title"
            />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleSubmit}>
              Create
            </button>
            <button className="button" onClick={() => showPrompt(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
}
