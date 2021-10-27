import classes from "./ImageFull.module.css";

const ImageFull = ({ url, close }) => {
  return (
    <div className={classes.wrapper} onClick={close}>
      <img src={url} alt="" />
      <button className={classes.x} onClick={close}>
        X
      </button>
    </div>
  );
};

export default ImageFull;
