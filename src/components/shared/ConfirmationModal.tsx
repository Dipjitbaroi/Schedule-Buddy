import clsx from "clsx";
import { ReactNode,  RefObject, useRef } from "react";
interface IProps {
    message: string,
    icon: ReactNode,
    cancelBtnText: string,
    confirmBtnText: string,
    handleConfirmClick: (ref: RefObject<HTMLButtonElement | null>) => void,
    handleCancelClick: (ref: RefObject<HTMLButtonElement | null>) => void,
    iconClass?: string,
    messageClass?: string,
    cancelBtnClass?: string,
    confirmBtnClass?: string
}
const ConfirmationModal = ({ message, icon, cancelBtnText, confirmBtnText, iconClass, messageClass, cancelBtnClass, confirmBtnClass, handleCancelClick, handleConfirmClick }: IProps) => {
    const closeRef = useRef<HTMLButtonElement | null>(null)
    return (
        <main>
            <form method="dialog">
                <button ref={closeRef} className="btn hidden" onClick={() => console.log('hi')
                }></button>
            </form>
            <div className="flex justify-center items-center">
                <div className={clsx("bg-[#EFF3FF] rounded-full w-fit p-8", iconClass)}>
                    {icon}
                </div>
            </div>
            <div className="">
                <h3 className={clsx("text-center text-[18px] my-5", messageClass)}>{message}</h3>
            </div>
            <div className="flex gap-5 justify-end w-full">
                <button className={clsx("btn btn-outline ", cancelBtnClass)} onClick={() => handleCancelClick(closeRef)}>{cancelBtnText}</button>
                <button className={clsx("btn btn-primary text-white", confirmBtnClass)} onClick={() => handleConfirmClick(closeRef)}>{confirmBtnText}</button>
            </div>
        </main>
    );
}

export default ConfirmationModal;