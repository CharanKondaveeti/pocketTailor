// import "./Main.css";
import { CgHomeAlt } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { Outlet, useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  function whenControlsClicked(route) {
    navigate(`${route}`);
  }

  return (
    <div className="main-app">
      <main className="workflow">
        <Outlet />
      </main>
      <div className="Bottom-controls">
        <span
          className="controls--homepage"
          onClick={() => whenControlsClicked("/homepage")}
        >
          <CgHomeAlt />
        </span>
        <span
          className="controls--customers"
          onClick={() => whenControlsClicked("/choosecustomer")}
        >
          <HiUserGroup />
        </span>
        <span
          className="controls--reports"
          onClick={() => whenControlsClicked("/")}
        >
          <TbReportSearch />
        </span>
      </div>
    </div>
  );
}

export default Main;
