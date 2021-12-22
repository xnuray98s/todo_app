import axios from "axios";
import React, { useState } from "react";

export default function Todo(props) {
  const task = props.task;
  console.log(task);
  const index = props.index;
  const updateTasks = props.updateTasks;
  const deleteTasks = props.deleteTasks;
  return (
    <div className="card block" style={{ borderRadius: "10px" }}>
      <button
        className="delete"
        style={{ position: "absolute", right: "0.25rem", top: "0.25rem" }}
        onClick={() => deleteTasks(task._id, index)}
      ></button>
      <div className="card-content">
        <div className="content">{task.title}</div>
      </div>
      <footer className="card-footer">
        {!task.isCompleted ? (
          <a
            className="card-footer-item"
            onClick={() => updateTasks(task._id, index)}
          >
            <span className="has-text-success">Done?</span>
          </a>
        ) : (
          <div className="card-footer-item">
            Good job!
            <span className="icon has-text-warning">
              <i className="fas fa-star"></i>
            </span>
          </div>
        )}
      </footer>
    </div>
  );
}
