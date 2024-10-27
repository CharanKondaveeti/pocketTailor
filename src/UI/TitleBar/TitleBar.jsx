import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TitleBar({ title }) {
  const navigate = useNavigate();

  return (
    <h1 className="heading-primary">
      <MdOutlineArrowBackIosNew
        className="back-btn-choose"
        onClick={() => navigate(-1)}
      />
      {title}
    </h1>
  );
}
