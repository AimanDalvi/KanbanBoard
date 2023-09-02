import React, { useState, useContext, useEffect } from "react";
import { BoardContext } from "./Board";
import { Card } from "react-bootstrap";
import TaskForm from "./New Task/TaskForm";
import axios from "axios";


const initialEditedValues = {
  title: "",
  description: "",
  
};
 
function CardItem(props) {
  const [show, setShow] = useState(false);
  const [editedValues, setFormValues] = useState(initialEditedValues);
  const handleClose = () => setShow(false);
  const { taskState,dispatch, onUpdatingTask } = useContext(
    BoardContext
  );

  const handleShow = () => {
    setShow(true);
  };
  const clickHandler = (type) => {
    if (type === "edit") {
     var formValues=  taskState.find((task) => {
       return task.id===props.task.id
      });
      setFormValues(formValues);
      handleShow();
    }
  };

  

  const handleUpdate = async (values, submitProps) => {
    try {
      submitProps.setSubmitting(false);
      await axios.put(`http://localhost:5000/api/task/updatetasks/${props.task._id}`, {
        title: values.title,
        description: values.description,
      });
      onUpdatingTask(values);
      setShow(false);
      submitProps.resetForm();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/task/deletetasks/${props.task._id}`
      );
      dispatch({ type: "ON_DELETE", payload: props.task._id });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  

  return (
    <>
      <TaskForm
        editedValues={editedValues}
        taskState="Update"
        show={show}
        handleClose={handleClose}
        onSubmit={handleUpdate}
      ></TaskForm>
      <Card key={props.task.id} className="card-task">
        <Card.Body>
          <Card.Title>
            {props.task.title}{" "}
            <div className="card-task-option pull-right">
              <a onClick={() => clickHandler("edit")}>
                <i className="fas fa-edit"></i>
              </a>
              &nbsp;
              <a onClick={handleDelete}>
                <i className="fas fa-trash"></i>
              </a>
            </div>
          </Card.Title>
          <div className="card-description">
            {props.task.description}
          </div>
        </Card.Body>
       </Card>
    </>
  );
}

export default CardItem;