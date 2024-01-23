import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./footerEmployees.scss";

const FooterEmployees = () => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <CSSTransition nodeRef={nodeRef} in={show} timeout={2000} classNames="anim">
      <div className="emp__bodyfooter" ref={nodeRef}>
        <p>DVE</p>
      </div>
    </CSSTransition>
  );
};

export default FooterEmployees;
