import useAdmin from "../hooks/useAdmin";

function Admin() {
  useAdmin();
  return (
    <div>
      <h1>Admin</h1>
      <p>Admin page content goes here.</p>
    </div>
  );
}

export default Admin;