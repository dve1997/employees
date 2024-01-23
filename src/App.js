import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderEmployees from "./components/headerEmployees/HeaderEmployees";
import FooterEmployees from "./components/footerEmployees/FooterEmployees";
import ListEmployeesPage from "./components/pages/ListEmployeesPage";
import CreateEmployeePage from "./components/pages/CreateEmpoyeePage";
import ItemEmployeePage from "./components/pages/ItemEmployeePage";
import ErrorPage from "./components/pages/ErrorPage";

import "./App.scss";

function App() {
  const [idEmp, setIdEmp] = useState(null);
  const [searchEmp, setSearchEmp] = useState("");

  const getId = (id) => {
    setIdEmp(id);
  };

  const getSearchEmp = (searchEmp) => {
    setSearchEmp(searchEmp);
  };

  return (
    <div className="wrapper">
      <div className="conteiner">
        <Router>
          <main className="emp__page">
            <header className="emp__header">
              <HeaderEmployees getSearchEmp={getSearchEmp} />
            </header>
            <section className="emp__section">
              <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route
                  path="/"
                  element={
                    <ListEmployeesPage getId={getId} searchEmp={searchEmp} />
                  }
                />
                <Route
                  path="/:id"
                  element={<ItemEmployeePage idEmp={idEmp} />}
                />
                <Route path="/create" element={<CreateEmployeePage />} />
              </Routes>
            </section>
            <footer className="emp__footer">
              <FooterEmployees />
            </footer>
          </main>
        </Router>
      </div>
    </div>
  );
}

export default App;
