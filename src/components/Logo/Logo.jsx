import Tilt from "react-parallax-tilt";
import "./logo.css";
import brain from "./brain.png";

// Logo tilt effect from https://www.npmjs.com/package/react-parallax-tilt

const Logo = () => {
   return (
      <div className="ma4 mt0 dib ">
         <Tilt
            glareEnable={true}
            glareMaxOpacity={0.8}
            glareColor="#ffffff"
            glarePosition="all"
            tiltMaxAngleX={35}
            tiltMaxAngleY={35}
         >
            <div style={{ height: "150px", width: "150px" }}>
               <img src={brain} alt="brain logo" style={{ width: "100%" }} />
            </div>
         </Tilt>
      </div>
   );
};
export default Logo;
