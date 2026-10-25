"use client";

import { Button, Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function AdminUsersManager() {
  const { data: session } = authClient.useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workingUserId, setWorkingUserId] = useState("");

  useEffect(() => {
    apiFetch("/api/admin/users")
      .then((data) => setUsers(data.users || []))
      .catch((requestError) => setError(requestError.message || "Could not load users."))
      .finally(() => setLoading(false));
  }, []);

  async function updateUser(user, field, value) {
    const userId = user._id;
    setWorkingUserId(userId);
    try {
      const endpoint = field === "block" ? "block" : "role";
      await apiFetch(`/api/admin/users/${userId}/${endpoint}`, {
        method: "PATCH",
        body: JSON.stringify({ [field === "block" ? "isBlocked" : "role"]: value }),
      });
      setUsers((current) =>
        current.map((item) =>
          item._id === userId
            ? { ...item, [field === "block" ? "isBlocked" : "role"]: value }
            : item
        )
      );
      toast.success(field === "block" ? "User access updated." : "User role updated.");
    } catch (requestError) {
      toast.error(requestError.message || "Could not update this user.");
    } finally {
      setWorkingUserId("");
    }
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 dark:border-neutral-800 dark:text-stone-400">
              <th className="px-4 py-3.5">User</th>
              <th className="px-4 py-3.5">Email</th>
              <th className="px-4 py-3.5">Role</th>
              <th className="px-4 py-3.5">Premium</th>
              <th className="px-4 py-3.5">Access</th>
              <th className="px-4 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isSelf = user.email === session?.user?.email;
              const isWorking = workingUserId === user._id;
              return (
                <tr
                  className="border-b border-stone-200 last:border-0 dark:border-neutral-800"
                  key={user._id}
                >
                  <td className="px-4 py-3.5 font-semibold">{user.name}</td>
                  <td className="px-4 py-3.5">{user.email}</td>
                  <td className="px-4 py-3.5 capitalize">{user.role}</td>
                  <td className="px-4 py-3.5">{user.isPremium ? "Yes" : "No"}</td>
                  <td className="px-4 py-3.5">{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={user.role === "admin" ? "secondary" : "primary"}
                        isDisabled={isWorking || (isSelf && user.role === "admin")}
                        onPress={() =>
                          updateUser(user, "role", user.role === "admin" ? "user" : "admin")
                        }
                      >
                        {user.role === "admin" ? "Remove admin" : "Make admin"}
                      </Button>
                      <Button
                        size="sm"
                        variant={user.isBlocked ? "primary" : "danger-soft"}
                        isDisabled={isWorking || isSelf}
                        onPress={() => updateUser(user, "block", !user.isBlocked)}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
