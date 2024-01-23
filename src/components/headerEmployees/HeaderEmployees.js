import { NavLink } from "react-router-dom";
import { useEffect, useState, useTransition, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./headerEmployees.scss";
import dve from "../../assets/dve.jpg";

const HeaderEmployees = ({ getSearchEmp }) => {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  const chageSearch = (e) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  };

  useEffect(() => {
    getSearchEmp(search);
    setShow(true);
  });

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={2000} classNames="anim">
      <div className="emp__bodyheader" ref={nodeRef}>
        <div className="emp__log">
          <img src={dve} alt="logo" />
        </div>
        <div className="emp__nav">
          <button className="emp__list">
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  color: isActive ? "rgb(32, 32, 255)" : "inherit",
                };
              }}
            >
              Список сотрудников
            </NavLink>
          </button>
          <button className="emp__create">
            <NavLink
              to="/create"
              style={({ isActive }) => {
                return {
                  color: isActive ? "rgb(32, 32, 255)" : "inherit",
                };
              }}
            >
              Создание сотрудника
            </NavLink>
          </button>
          <div className="emp__search">
            <input
              type="text"
              placeholder="Поиск сотрудника..."
              onChange={(e) => chageSearch(e)}
              value={isPending ? "Loading..." : search}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default HeaderEmployees;
