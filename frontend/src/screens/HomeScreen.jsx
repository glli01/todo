import React from "react";
const HomeScreen = () => {
  return (
    <div>
      <div className="home__title"> Welcome To TodoList!</div>
      <div className="home__text--center">
        Access your lists on the left.
        <br></br>
        Some important shortcuts are:
        <br></br>
        <br></br>
        "d" to delete the top list.
        <br></br>"c" to mark the top list as complete.
        <br></br>
        "enter" to add a task.
        <br></br>
        "spacebar" to show completed tasks.
      </div>
    </div>
  );
};

export default HomeScreen;
