import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { useHttp } from "../../hooks/http.hook";

import "./createEmployeePage.scss";

const CreateEmployeePage = () => {
  const [fioEmp, setFioEmp] = useState("");
  const [jobtitleEmp, setJobtitleEmp] = useState("");
  const [salaryEmp, setSalaryEmp] = useState("");
  const [experienceEmp, setExperienceEmp] = useState("");
  const { statusRequest, postData } = useHttp();
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  const changeInput = (e) => {
    const type = e.target.getAttribute("data-type");

    switch (type) {
      case "fio":
        setFioEmp(e.target.value);
        break;
      case "jobtitle":
        setJobtitleEmp(e.target.value);
        break;
      case "salary":
        setSalaryEmp(e.target.value);
        break;
      case "experience":
        setExperienceEmp(e.target.value);
        break;
      default:
        break;
    }
  };

  const createEmp = (e, postData) => {
    e.preventDefault();

    const newEmp = {
      id: uuidv4(),
      fio: fioEmp,
      jobtitle: jobtitleEmp,
      salary: salaryEmp,
      experience: experienceEmp,
      bonus: false,
      salaryUp: false,
      promotion: false,
    };
    const body = JSON.stringify(newEmp);

    postData("http://localhost:3001/employees", "POST", body)
      .then((data) => console.log(data))
      .finally(() => {
        setFioEmp("");
        setJobtitleEmp("");
        setSalaryEmp("");
        setExperienceEmp("");
      });
  };

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={2000} classNames="anim">
      <div className="emp__form" ref={nodeRef}>
        <form>
          <p className="emp__inputfio">Введите ФИО</p>
          <input
            className="emp__input"
            type="text"
            placeholder="Введите ФИО..."
            data-type="fio"
            onChange={(e) => changeInput(e)}
            value={fioEmp}
          />
          <p className="emp__inputjbtitle">Введите должность сотрудника</p>
          <input
            className="emp__input"
            type="text"
            placeholder="Введите должность сотрудника..."
            data-type="jobtitle"
            onChange={(e) => changeInput(e)}
            value={jobtitleEmp}
          />
          <p className="emp__inputsalary">Введите зарплату сотрудника</p>
          <input
            className="emp__input"
            type="text"
            placeholder="Введите зарплату сотрудника..."
            data-type="salary"
            onChange={(e) => changeInput(e)}
            value={salaryEmp}
          />
          <p className="emp__inputexperience">Введите стаж сотрудника</p>
          <input
            className="emp__input"
            type="text"
            placeholder="Введите стаж сотрудника..."
            data-type="experience"
            onChange={(e) => changeInput(e)}
            value={experienceEmp}
          />
          <br />
          <button
            className="emp__btn"
            type="submit"
            onClick={(e) => createEmp(e, postData)}
          >
            Создать
          </button>
          <button
            className="emp__btn"
            type="submit"
            onClick={(e) => createEmp(e, postData)}
          >
            <NavLink
              to="/"
              style={() => {
                return { color: "white" };
              }}
            >
              Создать и вернуться на главвную страницу
            </NavLink>
          </button>
        </form>
      </div>
    </CSSTransition>
  );
};

export default CreateEmployeePage;
