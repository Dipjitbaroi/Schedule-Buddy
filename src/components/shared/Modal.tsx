import clsx from "clsx";
import { IModalProps } from "../../utils/interface";

const Modal = ({ id, children, className, closeOutSideClick }: IModalProps) => {
    return (
        <dialog id={id} className="modal">
            <div className={clsx("modal-box", className)}>
                {children}
            </div>
            {closeOutSideClick ? <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form> : <></>}
        </dialog>
    );
}

export default Modal;