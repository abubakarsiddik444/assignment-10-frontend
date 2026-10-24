import { users } from "@/lib/data";

export const metadata = {
  title: "Manage Users - RecipeHub",
};

export default function ManageUsersPage() {
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Moderation</span>
        <h1>Manage Users</h1>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 [&_table]:min-w-[720px] [&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 [&_tr:last-child_td]:border-b-0 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800 dark:[&_th]:text-stone-400">
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
                  <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800 min-h-9 px-3 text-sm" type="button">
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
