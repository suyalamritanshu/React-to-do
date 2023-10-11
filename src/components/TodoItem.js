import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import axios from "axios";


const TodoItem = ({item}) => {
    // const { item,description,id} = props;
  const [todo, setTodo] = useState("");

  
    const inputRef = useRef(true);
  
    const changeFocus = () => {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    };
  
    const update = (id, value, e) => {
      if (e.which === 13) {
        //here 13 is key code for enter key
        updateTodo({ id, value});
        inputRef.current.disabled = true;
      }
    };

    const taskData = {
      "description": "workinfb",
      "completed": "false"
    }
  
    const completeData = {
      
      "completed": true
    }
  

    const updateTodo = async(id) => {
console.log("none",id.id,id.value)
      await axios.patch(`https://task-manager-eight-blond.vercel.app/tasks/${id.id}`, {
        "description": id.value,
      "completed": false
      }
      , {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1YTIwOTBmNWJkYTQ3YTM0OWZjNjUiLCJpYXQiOjE2OTY5NjUzMTN9.qwZ93Xcm1Ls31kcJz5WecJJ04_w9HHdOAMMujZ3XJdk"
          }
      }).then((res)=>{
        console.log(res.message);
      }).catch((err)=>{
        console.log(err.message);
      })
    }
  
    const removeTodo = async(id) => {
      await axios.delete(`https://task-manager-eight-blond.vercel.app/tasks/${id}`, {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1YTIwOTBmNWJkYTQ3YTM0OWZjNjUiLCJpYXQiOjE2OTY5NjUzMTN9.qwZ93Xcm1Ls31kcJz5WecJJ04_w9HHdOAMMujZ3XJdk"
          }
      }).then((res)=>{
        console.log(res.message);
      }).catch((err)=>{
        console.log(err);
      })
    }
  
    const completeTodo = async(id) => {
      console.log("complere ",id)
      await axios.patch(`https://task-manager-eight-blond.vercel.app/tasks/${id}`, completeData, {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1YTIwOTBmNWJkYTQ3YTM0OWZjNjUiLCJpYXQiOjE2OTY5NjUzMTN9.qwZ93Xcm1Ls31kcJz5WecJJ04_w9HHdOAMMujZ3XJdk"
          }
      }).then((res)=>{
        console.log(res.message);
      }).catch((err)=>{
        console.log(err.message);
      })
    }
    console.log("props itme ",item.description,item._id)

    return (
      <motion.li
        initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
        animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
        whileHover={{
          scale: 0.9,
          transition: { type: "spring", duration: 0.1 },
        }}
        exit={{
          x: "-60vw",
          scale: [1, 0],
          transition: { duration: 0.5 },
          backgroundColor: "rgba(255,0,0,1)",
        }}
        key={item.id}
        className="card"
      >
        <textarea
          ref={inputRef}
          disabled={inputRef}
          defaultValue={item.description}
          onKeyPress={(e) => update(item._id, inputRef.current.value, e)}
        />
        <div className="btns">
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeFocus()}
          >
            {" "}
            <AiFillEdit />{" "}
          </motion.button>
          { (
            <motion.button
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: "green" }}
              onClick={() => completeTodo(item._id)}
            >
              <IoCheckmarkDoneSharp />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "red" }}
            onClick={() => removeTodo(item._id)}
          >
            {" "}
            <IoClose />
          </motion.button>{" "}
        </div>
        {item.completed && <span className="completed">done</span>}
      </motion.li>
    );
  };
  
  export default TodoItem;