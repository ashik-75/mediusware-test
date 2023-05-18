import React, { useState } from "react";

const Problem1 = () => {
  const [user, setUser] = useState({ id: "", name: "", status: "" });

  //   users list
  const [users, setUsers] = useState([]);
  const [tempUsers, setTempUsers] = useState(users);

  const [type, setType] = useState("all");

  const { name, status } = user;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name && status) {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
      //   setTempUsers((prev) => [...prev, {...user,id: Date.now()}]);
      setUser({ name: "", status: "" });
    } else {
      // type the alert
      alert("field is required!");
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilter = (type) => {
    if (type === "active") {
      setType("active");
      setTempUsers(() =>
        users?.filter((user) => user.status.toLowerCase() === "active")
      );
    } else if (type === "completed") {
      setType("completed");
      setTempUsers(() =>
        users?.filter((user) => user.status.toLowerCase() === "completed")
      );
    } else {
      setType("all");
    }
  };

  function getOptions(type) {
    return type === "all" ? users : tempUsers;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleFormSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                value={name}
                onChange={handleChange}
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                value={status}
                onChange={handleChange}
                name="status"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${type === "all" && "active"}`}
                type="button"
                onClick={() => handleFilter("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${type === "active" && "active"}`}
                type="button"
                onClick={() => handleFilter("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${type === "completed" && "active"}`}
                type="button"
                onClick={() => handleFilter("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {getOptions(type)?.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
