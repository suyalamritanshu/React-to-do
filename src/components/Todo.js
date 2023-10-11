import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import axios from "axios";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const data = {
    "description": todo,
    "completed": false,
    "owner": "6525a2090f5bda47a349fc65"
  }

  const add = async () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      await axios.post("https://task-manager-eight-blond.vercel.app/tasks",data,{
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1YTIwOTBmNWJkYTQ3YTM0OWZjNjUiLCJpYXQiOjE2OTY5NjUzMTN9.qwZ93Xcm1Ls31kcJz5WecJJ04_w9HHdOAMMujZ3XJdk"
          }
        
      })
      setTodo("");
    }
  };
  //console.log("props from store", props);
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};

export default (Todos);