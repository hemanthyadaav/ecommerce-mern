import React from "react";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <div>
        <div className="jumbotron bg-success text-white text-center py-1">
          <h2 className="display-6">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>

      <footer className="footer bg-success text-center mt-auto py-2 fixed-bottom">
        <div className="container-fluid">
          <p className="text-gray">If You got any questions, feel free to reach out!</p>
          <button className="btn btn-warning btn-md">Contact Us</button>
        </div>
      </footer>
    </div>
  );
};

export default Base;
