import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useHttp } from "../../hooks/http.hook";

import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import "./listEmployees.scss";
import bonus from "../../assets/bonus.jpg";
import salary from "../../assets/salary.png";
import promotion from "../../assets/promotion.png";

const ListEmployees = ({ sort, getId, searchEmp }) => {
  const [employees, setEmployees] = useState([]);
  const { statusRequest, setStatusRequest, getData, patchData, deleteData } =
    useHttp();

  const showElement = (status) => {
    switch (status) {
      case "loading":
        return <Spinner />;
      case "loaded":
        return itemsEmployees(employees, sort, searchEmp);
      case "error":
        return <Error />;
      default:
        break;
    }
  };

  const itemsEmployees = (arr, sort, search) => {
    switch (sort) {
      case "all":
        return arr
          .filter((item) => item.fio.includes(search))
          .map((item) => (
            <CSSTransition key={item.id} timeout={2000} classNames="anim">
              <Employee
                key={item.id}
                item={item}
                patchData={patchData}
                setStatusRequest={setStatusRequest}
                getId={() => getId(item.id)}
                deleteData={deleteData}
              />
            </CSSTransition>
          ));
      case "bonus":
        return arr
          .filter((item) => item.bonus === true)
          .filter((item) => item.fio.includes(search))
          .map((item) => (
            <CSSTransition key={item.id} timeout={2000} classNames="anim">
              <Employee
                key={item.id}
                item={item}
                patchData={patchData}
                deleteData={deleteData}
                setStatusRequest={setStatusRequest}
              />
            </CSSTransition>
          ));
      case "salaryUp":
        return arr
          .filter((item) => item.salaryUp === true)
          .filter((item) => item.fio.includes(search))
          .map((item) => (
            <CSSTransition key={item.id} timeout={2000} classNames="anim">
              <Employee
                key={item.id}
                item={item}
                patchData={patchData}
                setStatusRequest={setStatusRequest}
                deleteData={deleteData}
              />
            </CSSTransition>
          ));
      case "promotion":
        return arr
          .filter((item) => item.promotion === true)
          .filter((item) => item.fio.includes(search))
          .map((item) => (
            <CSSTransition key={item.id} timeout={2000} classNames="anim">
              <Employee
                key={item.id}
                item={item}
                patchData={patchData}
                setStatusRequest={setStatusRequest}
                deleteData={deleteData}
              />
            </CSSTransition>
          ));
      default:
        break;
    }
  };

  useEffect(() => {
    getData("http://localhost:3001/employees").then((data) => {
      setEmployees(data);
    });
  }, [statusRequest]);

  return (
    <TransitionGroup className="emp__items">
      {showElement(statusRequest)}
    </TransitionGroup>
  );
};

const Employee = (props) => {
  const {
    id,
    fio,
    bonus: bonusCh,
    salaryUp,
    promotion: promotionCh,
  } = props.item;

  const updateData = (patchData, item, e) => {
    const type = e.target.getAttribute("alt");

    switch (type) {
      case "bonus":
        item.bonus = !item.bonus;
        break;
      case "salary":
        item.salaryUp = !item.salaryUp;
        break;
      case "promotion":
        item.promotion = !item.promotion;
        break;
      default:
        break;
    }

    const data = JSON.stringify(item);

    patchData("http://localhost:3001/employees/" + item.id, "PATCH", data).then(
      props.setStatusRequest("loading")
    );
  };

  const deleteDataEmp = (deleteData, id) => {
    deleteData("http://localhost:3001/employees/" + id).then(
      props.setStatusRequest("loading")
    );
  };

  return (
    <div className="emp__item">
      <div className="emp__data">
        <Link to={id}>
          <div className="emp__fio" onClick={props.getId}>
            {fio}
          </div>
        </Link>
      </div>
      <div className="emp__change">
        <img
          src={bonus}
          alt="bonus"
          className={bonusCh ? "emp__bonus img__active" : "emp__bonus"}
          onClick={(e) => updateData(props.patchData, props.item, e)}
        />
        <img
          src={salary}
          alt="salary"
          className={salaryUp ? "emp__salary img__active" : "emp__salary"}
          onClick={(e) => updateData(props.patchData, props.item, e)}
        />
        <img
          src={promotion}
          alt="promotion"
          className={
            promotionCh ? "emp__promotion img__active" : "emp__promotion"
          }
          onClick={(e) => updateData(props.patchData, props.item, e)}
        />
      </div>
      <div
        className="emp__close"
        onClick={(e) => deleteDataEmp(props.deleteData, id)}
      >
        &#9746;
      </div>
    </div>
  );
};

export default ListEmployees;
