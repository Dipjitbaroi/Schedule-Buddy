import { useFormik } from "formik";
import { appointmentStatus, IAppointmentModal } from "../../utils/interface";
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { storeData } from "../../api/authApi";
import toast from "react-hot-toast";
const initialValues: IAppointmentModal = {
    title: '',
    description: '',
    date: new Date().toISOString(),
}
const validationSchema = Yup.object({
    title: Yup.string().required('Title is Required').min(10, 'Minimum length 10'),
    description: Yup.string().required('Description is Required').min(20, 'Minimum length 20'),
    date: Yup.string().required('Date and Time is Required'),
})
const AppointmentModal = ({ userId }: { userId: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const closeRef = useRef<HTMLButtonElement | null>(null)

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const data = { ...values, from: user?.id, to: userId, status: appointmentStatus.pending }
            setIsLoading(true)
            try {

                await storeData({ collectionName: 'appointments', data })
                toast.success('Appointment successfully placed')
                formik.resetForm()
                closeRef.current?.click()
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
                toast.error('Appointment failed')
            }

        }
    })



    return (
        <section>
            <form method="dialog" className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-primary">Make an appointment</h1>
                <button className="btn btn-sm btn-circle btn-ghost hover:bg-[#EFF3FF]" ref={closeRef} onClick={() => formik.resetForm()}>✕</button>
            </form>
            <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col gap-5">
                <div className="from-control">
                    <label className=" flex items-center gap-2 text-lg mb-2">
                        Appointment Title :
                    </label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Write your title here"
                        className="input input-bordered w-full "
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-[12px] mt-1">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="from-control">
                    <label className=" flex items-center gap-2 text-lg mb-2">
                        Description :
                    </label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="Write your description here"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500 text-[12px] mt-1">{formik.errors.description}</div>
                    ) : null}
                </div>
                <div className="from-control">
                    <label className=" flex items-center gap-2 text-lg mb-2">
                        Date and Time :
                    </label>
                    <DatePicker
                        dateFormat="MMMM d, yyyy h:mm aa"
                        name="from"
                        placeholderText={'Select date and time'}
                        popperPlacement={'bottom-end'}
                        popperClassName="bg-red-500"
                        showTimeSelect
                        selected={new Date(formik.values.date)}
                        className="input input-bordered w-[14em] "
                        onChange={(date) => {
                            formik.setFieldValue("date", date?.toISOString());
                            console.log(date);

                        }}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.date && formik.errors.date ? (
                        <div className="text-red-500 text-[12px] mt-1">{formik.errors.date}</div>
                    ) : null}
                </div>
                <div className="form-control mt-5">
                    <button type="submit" className="btn btn-primary text-white">Confirm{isLoading ? <span className="loading loading-spinner loading-md"></span> : ''}</button>
                </div>
            </form>

        </section>
    );
}

export default AppointmentModal;