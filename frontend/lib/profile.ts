export interface ProfileData {
  fullName: string;
  email: string;
  title: string;
  username: string;
  profilePicture: string;
}

export type EditableProfileField =
  | "fullName"
  | "email"
  | "title"
  | "username";

export const defaultProfile: ProfileData = {
  fullName: "",
  email: "",
  title: "",
  username: "",
  profilePicture: "",
};

export const profileStorageKey = "ablespace-profile";