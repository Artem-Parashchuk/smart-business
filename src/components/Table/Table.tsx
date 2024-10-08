import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { clearFilters, setFilter} from "../../redux/users/usersSlice";
import {
  selectError,
  selectFilteredUsers,
  selectLoading,
} from "../../redux/users/selectors";

import { UserItem } from "../UserItem/UserItem";
import { Loader } from "../Loader/Loader";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { TableHead } from "../TableHead/TableHead";

import { User } from "../../interfaces/User";
import { UserFilters } from "../../interfaces/UserFilters";
import s from "./Table.module.css";

export const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredUsers = useSelector(selectFilteredUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (field: keyof UserFilters, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <p className={s.error_message}>
        Sorry, something went wrong. We are working on it.
      </p>
    );
  }

  return (
    <main className={s.main}>
      <div className={s.content}>
        <div className={s.table_container}>
          <table>
            <thead>
              <TableHead handleFilterChange={handleFilterChange}/>
            </thead>

            <tbody>
              {filteredUsers.length ? (
                filteredUsers.map((user) => (
                  <UserItem
                    onClick={() => handleUserClick(user)}
                    key={user.id}
                    user={user}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className={s.not_found}
                  >
                    Sorry, nothing found...
                  </td>
                  <td
                    colSpan={2}
                    className={s.not_found}
                  >
                    <button
                      onClick={handleClearFilters}
                      className={s.btn_remove}
                    >
                      Click to remove search
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ModalWindow
          user={selectedUser}
          onClose={closeModal}
        />
      )}
    </main>
  );
};
