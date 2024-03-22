import { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";

import ConfirmDeleteModal from "./ConfirmDeleteModal";


const UserListCard = ({userList}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const openConfirmDeleteModal = (user) => {
        setSelectedUser(user);
        setIsConfirmDeleteModalOpen(true)
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false)
    }
    return (

    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                <span className="flex items-center">
                    <PiUsersThreeBold className='mr-2' size={20} />
                    Users
                </span>
            </h5>
        </div>
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {userList.map((user, index) => (
                    <li key={index} className="py-3 sm:py-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <FaRegCircleUser size={20} />
                            </div>
                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {user.username}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <MdDeleteOutline className='mx-5 cursor-pointer' size={20} onClick={() => openConfirmDeleteModal(user)}/>
                            </div>
                            {isConfirmDeleteModalOpen && selectedUser && (
                                <ConfirmDeleteModal
                                    itemName={selectedUser.username}
                                    onClose={closeConfirmDeleteModal}
                                    type="User"
                                    itemID={selectedUser.userID}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
</div>
    )
}

export default UserListCard;