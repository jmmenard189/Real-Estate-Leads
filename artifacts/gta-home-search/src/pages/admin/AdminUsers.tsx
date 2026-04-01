import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "./AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminUserRow {
  id: number;
  username: string;
  role: string;
  createdAt: string;
}

export default function AdminUsers() {
  const { user } = useAdminAuth();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState<"admin" | "super_admin">("admin");
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { credentials: "include" });
      const data = await res.json();
      setUsers(data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formUsername, password: formPassword, role: formRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message ?? "Failed to create user.");
      } else {
        setShowForm(false);
        setFormUsername("");
        setFormPassword("");
        setFormRole("admin");
        fetchUsers();
      }
    } catch {
      setFormError("An unexpected error occurred.");
    } finally {
      setFormSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/users/${id}`, { method: "DELETE", credentials: "include" });
    setDeleteConfirmId(null);
    fetchUsers();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
  }

  if (user?.role !== "super_admin") {
    return (
      <AdminLayout>
        <div className="p-12 text-center text-slate-500">You don't have permission to view this page.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Users</h1>
            <p className="text-slate-400 text-sm mt-0.5">Manage who can access this admin portal</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setFormError(""); }}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>

        {/* Create user form */}
        {showForm && (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Create New Admin Account</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Username</label>
                  <input
                    type="text"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    required
                    minLength={3}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g. jsmith"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Password</label>
                  <input
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as "admin" | "super_admin")}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="admin">Admin — view leads only</option>
                    <option value="super_admin">Super Admin — full access</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-2 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg transition-colors"
                >
                  {formSubmitting ? "Creating…" : "Create Account"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading…</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Username</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Created</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-white font-medium">
                      {u.username}
                      {u.id === user?.id && <span className="ml-2 text-xs text-slate-500">(you)</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                        u.role === "super_admin"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-slate-700/50 text-slate-300 border-slate-600/30"
                      }`}>
                        {u.role === "super_admin" ? "Super Admin" : "Admin"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      {u.id !== user?.id && (
                        <>
                          {deleteConfirmId === u.id ? (
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-slate-400 text-xs">Remove {u.username}?</span>
                              <button
                                onClick={() => handleDelete(u.id)}
                                className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded"
                              >Yes</button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2 py-1 bg-slate-700 text-white text-xs rounded"
                              >No</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(u.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-500">
          <strong className="text-slate-400">Roles:</strong> Admin accounts can view and manage leads. Super Admin accounts can also create, view, and remove admin users.
        </div>
      </div>
    </AdminLayout>
  );
}
