import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Loading from "./Loading/loading";

const DisplayTodos = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {  updateTodo, completeTodo } = props;

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true)
      await axios.get("https://task-manager-eight-blond.vercel.app/tasks", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1YTIwOTBmNWJkYTQ3YTM0OWZjNjUiLCJpYXQiOjE2OTY5NjUzMTN9.qwZ93Xcm1Ls31kcJz5WecJJ04_w9HHdOAMMujZ3XJdk"
        }
      }).then((res) => {
        setLoading(false)
        setData(res.data.tasks)
        console.log("first",res.data.tasks)
      }).catch((err) => {
        setLoading(false)
        console.log(err);
      })
    }
    getTodos();
  }, []);

  return (
    <div className="displaytodos">
      <ul>
        <AnimatePresence>
          {data.length > 0
            ? data.map((item) => {
              return (
                (
                  <TodoItem
                    key={item._id}
                    id={item._id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={updateTodo}
                    completeTodo={completeTodo}
                  />
                )
              );
            })
            : null}
           
          
        </AnimatePresence>
      </ul>
      {loading && <Loading />}
    </div>
  );
};

export default (DisplayTodos);