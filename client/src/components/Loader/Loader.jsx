import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute bg-white opacity-75 inset-0"></div>
      <div className="z-50">
        <img src='https://neyoportfolio.s3.eu-north-1.amazonaws.com/loader.gif' alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute bg-white opacity-75 inset-0"></div>
      <div className="z-50">
        <img src='https://neyoportfolio.s3.eu-north-1.amazonaws.com/loader.gif' alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
