import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ButtonBack.scss";

const ButtonBack = () => {

  const navigate = useNavigate();

  return (
    <button
        type="button"
        className="button button--back"
        onClick={() => navigate(-1)}
      ></button>
  )
}

export default ButtonBack;