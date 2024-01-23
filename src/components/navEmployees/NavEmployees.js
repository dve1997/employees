import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./navEmployees.scss";

const NavEmployees = ({ getDataType }) => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={2000} classNames="anim">
      <div className="emp__navbar" ref={nodeRef}>
        <div className="emp__sorting">
          <button
            className="emp__btn emp__btnall btn__active"
            data-type="all"
            onClick={(e) => {
              getDataType(e);
            }}
          >
            Все сотрудники
          </button>
          <button
            className="emp__btn emp__btnbonus"
            data-type="bonus"
            onClick={(e) => getDataType(e)}
          >
            Бонус
          </button>
          <button
            className="emp__btn emp__btnsalary"
            data-type="salaryUp"
            onClick={(e) => getDataType(e)}
          >
            Повышение З/П
          </button>
          <button
            className="emp__btn emp__btnpromotion"
            data-type="promotion"
            onClick={(e) => getDataType(e)}
          >
            Повышение
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NavEmployees;
