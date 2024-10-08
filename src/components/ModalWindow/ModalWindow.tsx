import { User } from "../../interfaces/User";
import s from "./ModalWindow.module.css";

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export const ModalWindow: React.FC<UserModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    // Modal window close when user press outside content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={s.modal}
      onClick={handleClickOutside}
    >
      <div className={s.modal_content}>
        <button
          onClick={onClose}
          className={s.closeButton}
        >
          &times;
        </button>
        <h2 className={s.title}>Personal Information</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone: </strong>
          {user.phone.split(" ")[0].replaceAll(".", "-")}
        </p>
        <h3 className={s.subtitle}>Address:</h3>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Street:</strong> {user.address.street}
        </p>
        <h3 className={s.subtitle}>Place of work:</h3>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
      </div>
    </div>
  );
};
