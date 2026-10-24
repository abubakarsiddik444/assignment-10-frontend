import Image from "next/image";
import { SealCheck } from "@gravity-ui/icons";
import { currentUser } from "@/lib/data";

export const metadata = {
  title: "Profile - RecipeHub",
};

export default function ProfilePage() {
  return (
    <section>
      <div className="profile-header">
        <Image src={currentUser.image} alt={currentUser.name} width={120} height={120} />
        <div>
          <span className="eyebrow">Profile</span>
          <h1>{currentUser.name}</h1>
          <p>{currentUser.email}</p>
          {currentUser.isPremium ? (
            <span className="premium-badge">
              <SealCheck size={16} /> Premium member
            </span>
          ) : null}
        </div>
      </div>
      <form className="form-grid profile-form">
        <label>
          Name
          <input type="text" defaultValue={currentUser.name} />
        </label>
        <label>
          Image
          <input type="url" defaultValue={currentUser.image} />
        </label>
        <button className="button button-primary" type="submit">
          Update Profile
        </button>
      </form>
    </section>
  );
}
