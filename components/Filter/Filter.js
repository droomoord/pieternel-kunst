import React from "react";
import classes from "./Filter.module.css";
import { FaFilter } from "react-icons/fa";

const filter = ({ changed }) => {
  return (
    <div className={classes.wrapper}>
      <FaFilter size="1em" />
      <select name="" className={classes.select} onChange={changed}>
        <option value="alle" defaultValue>
          alle exposities
        </option>
        <option value="toekomst">toekomstige expo's</option>
        <option value="verleden">voorbije expo's</option>
      </select>
    </div>
  );
};

export default filter;
