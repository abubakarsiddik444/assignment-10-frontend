import { users } from "@/lib/data";

export const metadata = {
  title: "Manage Users - RecipeHub",
};

export default function ManageUsersPage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Moderation</span>
        <h1>Manage Users</h1>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Premium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isPremium ? "Yes" : "No"}</td>
                <td>
                  <button className="button button-secondary compact" type="button">
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
