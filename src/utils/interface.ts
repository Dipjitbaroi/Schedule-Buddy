import { UserCredential } from "firebase/auth";
import { Dispatch, ElementType, ReactNode, SetStateAction } from "react";

export interface INavItem {
  name: string;
  path: string;
  Icon: ElementType;
}
export interface INavbarProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
export interface ISidebarProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
export interface IUserData {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}
export interface IUserCardContainerProps {
  userData: IUserData;
}

export interface IModalProps {
  id: string;
  children: ReactNode;
  className?: string;
  closeOutSideClick?: boolean;
}
export interface IAuthFromInitialValue {
  name?: string;
  email: string;
  password: string;
  image?: File | null;
}

export interface IAuthContext {
  user?: IUserData | null;
  login?: (credentials: IAuthFromInitialValue) => Promise<UserCredential>;
  signUp?: (U: IAuthFromInitialValue) => Promise<UserCredential>;
  signOut?: () => void;
  isLoading: boolean;
  setIsLoading?: (T: boolean) => void;
  setUser?: (T: IUserData | null) => void;
  setAuthStatus?: (T: "authenticated" | "unauthenticated") => void;
  authStatus: "authenticated" | "unauthenticated";
}

export interface IUploadProfileImage {
  image?: File | null;
  uid: string;
}
export interface IStoreData {
  collectionName: string;
  data: any;
}
export interface IStoreUser extends IStoreData {
  customId: string;
}
export interface IAppointmentModal {
  title: string;
  description: string;
  date: string;
}

export enum appointmentStatus {
  pending = "pending",
  approved = "approved",
  canceled = "canceled",
  all = "all",
}
export interface IAppointments extends IAppointmentModal {
  id: string;
  status: appointmentStatus;
  user: IUserData;
}
