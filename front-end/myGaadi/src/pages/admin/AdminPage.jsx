import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Style/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedAdmin, setEditedAdmin] = useState({});
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios
      .get(`${config.serverURL}/admin/`,   {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
      .then((res) => setAdmins(res.data))
      .catch((err) => console.error("Failed to fetch admins", err));
  };
  console.log(admins);

  const handleDelete = (id) => {
    axios
      .delete(`${config.serverURL}/admin/${id}`,   {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
      .then(() => fetchAdmins())
      .catch((err) => console.error("Failed to delete admin", err));
  };

  // Start editing
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedAdmin({ ...admins[index] });
  };


  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-page-container">
      <h2 style={{ textAlign: "center" }}>Admin Panel</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Password</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editedAdmin.name}
                    onChange={handleChange}
                  />
                ) : (
                  admin.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="email"
                    name="email"
                    value={editedAdmin.email}
                    onChange={handleChange}
                  />
                ) : (
                  admin.email
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="phoneNo"
                    value={editedAdmin.phoneNo}
                    onChange={handleChange}
                  />
                ) : (
                  admin.phoneNo
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="password"
                    name="password"
                    value={editedAdmin.password}
                    onChange={handleChange}
                  />
                ) : (
                  "********"
                )}
              </td>
              <td>{admin.type}</td>
              <td>{admin.status}</td>
              <td>{admin.createdAt}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditIndex(-1)}>Cancel</button>
                  </>
                ) : (
                  <div className="d-flex gap-2 align-items-center">
                    <i onClick={() => navigate(`/home/admin/update/${admin.id}`)} style={{ fontSize: "25px" }} class="bi bi-pencil-square"></i>
                    <i onClick={() => handleDelete(admin.id)} style={{ fontSize: "25px", }} class="bi bi-trash ms-auto"></i>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
