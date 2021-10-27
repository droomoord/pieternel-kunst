import classes from "./ImageFull.module.css";

const ImageFull = ({ url, close, changeImage }) => {
  function clicked(e, direction) {
    e.stopPropagation();
    changeImage(direction);
  }
  return (
    <div className={classes.wrapper} onClick={close}>
      <i
        className={`${classes.arrow} ${classes.left}`}
        onClick={(e) => clicked(e, -1)}
      ></i>
      <i
        className={`${classes.arrow} ${classes.right}`}
        onClick={(e) => clicked(e, 1)}
      ></i>
      <img src={url} alt="" onClick={() => window.open(url, "_blank")} />
      <button className={classes.x} onClick={close}>
        X
      </button>
    </div>
  );
};

export default ImageFull;
