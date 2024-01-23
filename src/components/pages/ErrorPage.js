import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./errorPage.scss";
import error from "../../assets/error.png";

const ErrorPage = () => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={2000} classNames="anim">
      <div className="emp__error" ref={nodeRef}>
        <h3>Возникла ошибка, указанной странцы не существует.</h3>
        <img src={error} alt="error" />
      </div>
    </CSSTransition>
  );
};

export default ErrorPage;
