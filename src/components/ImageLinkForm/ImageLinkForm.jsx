import "../../App.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
   return (
      <div className="center">
         <p className="f3 db f-grow tc">
            {"This Magic Brain will detect faces in your pictures. Give it a try!"}
         </p>
         <p className="db f-grow tc ma1">
            {"(paste a jpg or png picture file from the web in the searchbar)"}
         </p>
         <div className="form-bg">
            <div className=" pa4 br3 shadow-5">
               <input className="f4 pa2 w-70" type="text" onChange={(e) => onInputChange(e)} />
               <button
                  className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                  onClick={onPictureSubmit}
               >
                  Detect
               </button>
            </div>
         </div>
      </div>
   );
};
export default ImageLinkForm;
