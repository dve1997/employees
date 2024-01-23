import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useHttp } from "../../hooks/http.hook";

import "./itemEmployeePage.scss";

const ItemEmployeePage = ({ idEmp: id }) => {
  const [employees, setEmployees] = useState([]);
  const { getData } = useHttp();
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  const { fio, jobtitle, salary, experience } = employees;

  useEffect(() => {
    getData("http://localhost:3001/employees/" + id).then((data) => {
      setEmployees(data);
      setShow(true);
    });
  }, []);

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={2000} classNames="anim">
      <div className="emp__info" ref={nodeRef}>
        <div className="emp__title">ФИО :</div>
        <div className="emp__inf">{fio}</div>
        <div className="emp__title">Должность :</div>
        <div className="emp__inf">{jobtitle}</div>
        <div className="emp__title">Зарплата :</div>
        <div className="emp__inf">{salary} $</div>
        <div className="emp__title">Трудовой стаж :</div>
        <div className="emp__inf">{experience} лет</div>
      </div>
    </CSSTransition>
  );
};

export default ItemEmployeePage;
