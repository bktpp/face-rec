import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
   return (
      <div className="center">
         {imageUrl && (
            <div className="mt3 absolute">
               <img id="inputimage" width="500px" height="auto" src={imageUrl} alt="face photo" />
               <div
                  className="bounding-box"
                  style={{
                     top: box.topRow,
                     right: box.rightCol,
                     bottom: box.bottomRow,
                     left: box.leftCol,
                  }}
               ></div>
            </div>
         )}
      </div>
   );
};
export default FaceRecognition;
