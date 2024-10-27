import { GoSearch } from "react-icons/go";
import "./Input.css";
import { FiUser } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";

export default function Input({ mode, placeholder, setter, value }) {
  return (
    <div htmlFor="input" className="input">
      {mode === "name" && <FiUser />}
      {mode === "phoneNumber" && <LuPhone />}
      {mode === "search" && <GoSearch />}
      <input
        id="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setter(e.target.value)}
        required
      />
    </div>
  );
}
