"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  defaultProfile,
  EditableProfileField,
  ProfileData,
  profileStorageKey,
} from "@/lib/profile";

export function useProfile() {
  const [profile, setProfile] =
    useState<ProfileData>(defaultProfile);

  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedProfile =
      window.localStorage.getItem(profileStorageKey);

    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(
          storedProfile,
        ) as Partial<ProfileData>;

        setProfile({
          ...defaultProfile,
          ...parsedProfile,
        });
      } catch {
        window.localStorage.removeItem(
          profileStorageKey,
        );
      }
    }

    setLoaded(true);
  }, []);

  function updateField(
    field: EditableProfileField,
    value: string,
  ) {
    const formattedValue =
      field === "username"
        ? value.toLowerCase().replace(/\s+/g, "")
        : value;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: formattedValue,
    }));

    setSaved(false);
  }

  function handlePictureChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert(
        "Profile picture must be smaller than 2 MB.",
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setProfile((currentProfile) => ({
        ...currentProfile,
        profilePicture: reader.result as string,
      }));

      setSaved(false);
    };

    reader.readAsDataURL(file);
  }

  function removePicture() {
    setProfile((currentProfile) => ({
      ...currentProfile,
      profilePicture: "",
    }));

    setSaved(false);
  }

  function saveProfile(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanedProfile: ProfileData = {
      ...profile,
      fullName: profile.fullName.trim(),
      email: profile.email.trim(),
      title: profile.title.trim(),
      username: profile.username.trim(),
    };

    setProfile(cleanedProfile);

    window.localStorage.setItem(
      profileStorageKey,
      JSON.stringify(cleanedProfile),
    );

    setSaved(true);
  }

  function resetProfile() {
    const confirmed = window.confirm(
      "Reset your profile information?",
    );

    if (!confirmed) {
      return;
    }

    setProfile(defaultProfile);
    setSaved(false);

    window.localStorage.removeItem(
      profileStorageKey,
    );
  }

  return {
    profile,
    loaded,
    saved,
    updateField,
    handlePictureChange,
    removePicture,
    saveProfile,
    resetProfile,
  };
}