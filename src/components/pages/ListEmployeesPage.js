import { useState } from "react";

import ListEmployees from "../listEmployees/ListEmployees";
import NavEmployees from "../navEmployees/NavEmployees";

const ListEmployeesPage = ({ getId, searchEmp }) => {
  const [sort, setSort] = useState("all");

  const getDataType = (e) => {
    document
      .querySelectorAll(".emp__btn")
      .forEach((item) => item.classList.remove("btn__active"));
    e.target.classList.add("btn__active");
    const dataType = e.target.getAttribute("data-type");
    setSort(dataType);
  };

  return (
    <>
      <ListEmployees sort={sort} getId={getId} searchEmp={searchEmp} />
      <NavEmployees getDataType={getDataType} />
    </>
  );
};

export default ListEmployeesPage;
