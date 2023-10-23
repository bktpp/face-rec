import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import Register from "./components/Register/Register.jsx";

// Particles effect from https://www.npmjs.com/package/particles-bg

const App = () => {
   const [input, setInput] = useState("");
   const [imageUrl, setImageUrl] = useState("");
   const [box, setBox] = useState({});
   const [route, setRoute] = useState("signin");
   const [isSignedIn, setIsSignedIn] = useState(false);
   const [user, setUser] = useState({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
   });

   const loadUser = (data) => {
      setUser({
         id: data.id,
         name: data.name,
         email: data.email,
         entries: data.entries,
         joined: data.joined,
      });
   };

   const connectLocal = async () => {
      const srvr = await fetch("https://facerec-api-lt9c.onrender.com/");
      const data = await srvr.json();
      console.log(data);
   };

   connectLocal();

   const onRouteChange = (route) => {
      setRoute(route);
      if (route === "home") {
         setIsSignedIn(true);
      } else {
         setIsSignedIn(false);
         setImageUrl("");
      }
   };

   const calcFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);

      return {
         leftCol: clarifaiFace.left_col * width,
         topRow: clarifaiFace.top_row * height,
         rightCol: width - clarifaiFace.right_col * width,
         bottomRow: height - clarifaiFace.bottom_row * height,
      };
   };

   const displayFaceBox = (box) => {
      setBox(box);
      console.log(box);
   };

   const onInputChange = (event) => {
      console.log(event.target.value);
      setInput(event.target.value);
   };

   const returnClarifaiRequest = (imageUrl) => {
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      // In this section, we set the user authentication, user and app ID, model details, and the URL
      // of the image we want as an input. Change these strings to run your own example.
      //////////////////////////////////////////////////////////////////////////////////////////////////

      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = "3db579e4d7124fa4b02c57e9aef2f380";
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = "bktp";
      const APP_ID = "face-rec-project";
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = "face-detection";
      const IMAGE_URL = imageUrl;

      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////

      const raw = JSON.stringify({
         user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
         },
         inputs: [
            {
               data: {
                  image: {
                     url: IMAGE_URL,
                  },
               },
            },
         ],
      });

      const requestOptions = {
         method: "POST",
         headers: {
            Accept: "application/json",
            Authorization: "Key " + PAT,
         },
         body: raw,
      };

      return requestOptions;
   };

   const onPictureSubmit = () => {
      setImageUrl(input);

      fetch(
         "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
         returnClarifaiRequest(input)
      )
         .then((response) => response.json())
         .then((result) => {
            console.log(result);
            if (result) {
               fetch("https://facerec-api-lt9c.onrender.com/image", {
                  method: "put",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                     id: user.id,
                  }),
               })
                  .then((resp) => resp.json())
                  .then((count) => {
                     setUser({
                        ...user,
                        entries: count,
                     });
                  });
            }
            displayFaceBox(calcFaceLocation(result));
         })
         .catch((error) => console.log("error bruh", error));
   };

   return (
      <div className="App">
         <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
         <ParticlesBg className="wrapper" type="cobweb" bg={true} color="#ffffff" />
         {route === "home" ? (
            <>
               <Logo />
               <Rank userName={user.name} userEntries={user.entries} />
               <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
               <FaceRecognition imageUrl={imageUrl} box={box} />
            </>
         ) : route === "signin" ? (
            <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
         ) : (
            <Register onRouteChange={onRouteChange} loadUser={loadUser} />
         )}
      </div>
   );
};

export default App;
