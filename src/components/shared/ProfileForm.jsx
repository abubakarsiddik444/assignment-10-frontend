"use client";

import Image from "next/image";
import { SealCheck } from "@gravity-ui/icons";
import { Button, Card, Input, ListBox, Select } from "@heroui/react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

const emptyProfile = {
  name: "",
  email: "",
  image: "",
  gender: "",
  isPremium: false,
};

export function ProfileForm() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    apiFetch("/api/auth/me")
      .then(({ user }) => {
        if (!user) return;
        setProfile((current) => ({
          ...emptyProfile,
          name: user.name || session.user.name || "",
          email: session.user.email || "",
          image: user.image || session.user.image || "",
          gender: user.gender || session.user.gender || "",
          isPremium: Boolean(user.isPremium),
        }));
      })
      .catch((error) => {
        toast.error(`Could not load your saved profile details: ${error.message}`);
      });
  }, [session?.user]);

  const values = profile || {
    ...emptyProfile,
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    gender: session?.user?.gender || "",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const updates = {
        name: values.name.trim(),
        image: values.image.trim(),
        gender: values.gender,
      };
      const authResult = await authClient.updateUser(updates);
      if (authResult.error) {
        throw new Error(authResult.error.message || "Could not update your account profile.");
      }
      await apiFetch("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
      await refetch();
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error.message || "Could not update your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (isPending) return <p>Loading profile...</p>;
  if (!session?.user) return <p>Please sign in to view your profile.</p>;

  const image = values.image || "/window.svg";

  return (
    <section>
      <div className="mb-7 flex items-center gap-5 max-[660px]:flex-col max-[660px]:items-start [&_img]:size-[120px] [&_img]:rounded-2xl [&_img]:object-cover [&_h1]:text-[clamp(2rem,5vw,3.2rem)] [&_h1]:leading-none">
        <Image
          src={image}
          alt={values.name || "Profile"}
          width={120}
          height={120}
          unoptimized
          onError={(event) => {
            event.currentTarget.src = "/window.svg";
          }}
        />
        <div>
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Profile</span>
          <h1>{values.name}</h1>
          <p>{values.email}</p>
          {values.isPremium ? (
            <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1.5 font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <SealCheck size={16} /> Premium member
            </span>
          ) : null}
        </div>
      </div>
      <Card>
        <Card.Content>
      <form
        className="grid grid-cols-2 gap-4 max-[660px]:grid-cols-1 [&_label]:grid [&_label]:gap-2 [&_label]:font-bold [&_label]:text-stone-800 dark:[&_label]:text-stone-100 [&_input]:min-h-[46px] [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-stone-100 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-stone-900 [&_input]:placeholder:text-stone-400 dark:[&_input]:border-neutral-700 dark:[&_input]:bg-neutral-800 dark:[&_input]:text-stone-100"
        onSubmit={handleSubmit}
      >
        <label>
          Name
          <Input
            type="text"
            value={values.name}
            maxLength={100}
            onChange={(event) => setProfile({ ...values, name: event.target.value })}
            required
          />
        </label>
        <label>
          Image URL
          <Input
            type="url"
            value={values.image}
            onChange={(event) => setProfile({ ...values, image: event.target.value })}
            placeholder="https://..."
          />
        </label>
        <label>
          Gender
          <Select
            aria-label="Gender"
            selectedKey={values.gender || null}
            onSelectionChange={(key) => setProfile({ ...values, gender: String(key ?? "") })}
            isRequired
          >
            <Select.Trigger className="min-h-11">
              <Select.Value placeholder="Select an option" />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {["Female", "Male", "Other"].map((gender) => (
                  <ListBox.Item key={gender} id={gender} textValue={gender}>{gender}</ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </label>
        <Button
          variant="primary"
          type="submit"
          isDisabled={saving}
        >
          {saving ? "Saving..." : "Update Profile"}
        </Button>
      </form>
        </Card.Content>
      </Card>
    </section>
  );
}
