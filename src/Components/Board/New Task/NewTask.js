import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TaskForm from "./TaskForm";
import axios from "axios";

const initialValues = {
  title: "",
  description: ""
};

function NewTask(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {}, []);

  const onSubmit = async (values, submitProps) => {
    try {
      submitProps.setSubmitting(false);
      const response = await axios.post("http://localhost:5000/api/task/addtasks", values);
      props.addNewTask(response.data);
      setShow(false);
      submitProps.resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Task
      </Button>
      <TaskForm taskState='New' show={show} handleClose={handleClose} initialValues={initialValues} onSubmit={onSubmit}></TaskForm>
    </>
  );
}

export default NewTask;
