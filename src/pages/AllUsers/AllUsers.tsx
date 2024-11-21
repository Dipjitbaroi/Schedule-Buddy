
import { IUserData } from '../../utils/interface'
import UserCardContainer from '../../components/AllUsers/UserCardContainer'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '../../stateManagement/hooks'
import { getAllUsers, searchUser } from '../../stateManagement/users/usersSlice'


const AllUsers = () => {
    const [search, setSearch] = useState<string>('');
    const allUses = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    console.log({ allUses });
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const debouncedSearch = useCallback(
        _.debounce(async (searchValue: string) => {
            dispatch(searchUser(searchValue))
            setSearch(searchValue)
        }, 500),
        []
    );
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);

        debouncedSearch(e.target.value)
    }

    useEffect(() => {
        // Cleanup function to cancel the debounced function on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <main>
            <section className="flex md:flex-row flex-col justify-between items-center md:py-10 md:px-10 py-5 px-5 gap-2">
                <h3 className="text-[16px] font-semibold text-primary">User list</h3>
                <label className="input input-bordered flex items-center gap-2 w-full max-w-[15em]">
                    <input type="text" className="grow placeholder:text-[12px]" placeholder="Search by name and email" onChange={handleSearch} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center justify-center p-5'>
                {
                    search?.length && allUses?.searchedUsers?.length ? allUses?.searchedUsers?.map((info: IUserData, i: number) => <UserCardContainer userData={info} key={i} />) : search?.length && !allUses?.searchedUsers?.length ? <h1 className='text-xl italic '>User not Found</h1> : allUses?.allUsers?.map((info: IUserData, i: number) => <UserCardContainer userData={info} key={i} />)
                }
            </section>
        </main>
    );
}

export default AllUsers;