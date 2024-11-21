import { AiOutlineUser } from "react-icons/ai";
import { INavItem } from "./interface";
import { CiBoxList } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";

export const navItems: INavItem[] = [
    {
        name: 'All users',
        Icon: AiOutlineUser,
        path: '/all-users'
    },
    {
        name: 'My Appointments',
        Icon: CiBoxList,
        path: '/my-appointments'
    },
    {
        name: 'Requested Appointments',
        Icon: LiaClipboardListSolid,
        path: '/requested-appointments'
    },

];
