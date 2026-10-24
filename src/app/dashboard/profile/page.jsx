import Image from "next/image";
import { SealCheck } from "@gravity-ui/icons";
import { currentUser } from "@/lib/data";

export const metadata = {
  title: "Profile - RecipeHub",
};

export default function ProfilePage() {
  return (
    <section>
      <div className="mb-7 flex items-center gap-5 max-[660px]:flex-col max-[660px]:items-start [&_img]:size-[120px] [&_img]:rounded-2xl [&_img]:object-cover [&_h1]:text-[clamp(2rem,5vw,3.2rem)] [&_h1]:leading-none">
        <Image src={currentUser.image} alt={currentUser.name} width={120} height={120} />
        <div>
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Profile</span>
          <h1>{currentUser.name}</h1>
          <p>{currentUser.email}</p>
          {currentUser.isPremium ? (
            <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1.5 font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <SealCheck size={16} /> Premium member
            </span>
          ) : null}
        </div>
      </div>
      <form className="grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-bold [&_label]:text-stone-800 dark:[&_label]:text-stone-100 [&_input]:min-h-[46px] [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-stone-100 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-stone-900 [&_input]:placeholder:text-stone-400 [&_input]:focus:border-emerald-600 [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-emerald-600/20 [&_select]:min-h-[46px] [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-stone-200 [&_select]:bg-stone-100 [&_select]:px-3 [&_select]:py-2.5 [&_textarea]:min-h-[46px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-stone-200 [&_textarea]:bg-stone-100 [&_textarea]:px-3 [&_textarea]:py-3 [&_input]:dark:border-neutral-700 [&_input]:dark:bg-neutral-800 [&_input]:dark:text-stone-100 [&_select]:dark:border-neutral-700 [&_select]:dark:bg-neutral-800 [&_select]:dark:text-stone-100 [&_textarea]:dark:border-neutral-700 [&_textarea]:dark:bg-neutral-800 [&_textarea]:dark:text-stone-100 grid-cols-2 max-[660px]:grid-cols-1">
        <label>
          Name
          <input type="text" defaultValue={currentUser.name} />
        </label>
        <label>
          Image
          <input type="url" defaultValue={currentUser.image} />
        </label>
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300" type="submit">
          Update Profile
        </button>
      </form>
    </section>
  );
}
