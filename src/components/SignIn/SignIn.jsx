import { useState } from "react";
import "./SignIn.css";

const SignIn = ({ onRouteChange, loadUser }) => {
   const [signInEmail, setSignInEmail] = useState("");
   const [signInPass, setSignInPass] = useState("");

   const onEmailChange = (e) => {
      setSignInEmail(e.target.value);
   };

   const onPassChange = (e) => {
      setSignInPass(e.target.value);
   };

   const getSignIn = () => {
      fetch("http://localhost:3000/signin", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            email: signInEmail,
            password: signInPass,
         }),
      })
         .then((resp) => resp.json())
         .then((user) => {
            if (user.id) {
               loadUser(user);
               onRouteChange("home");
            } else console.error("no user by that name");
         });
   };

   const onSubmitSignIn = (e) => {
      e.preventDefault();
      getSignIn();
      // fetch("http://localhost:3000/signin", {
      //    method: "post",
      //    headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify({
      //       email: signInEmail,
      //       password: signInPass,
      //    }),
      // })
      //    .then((resp) => resp.json())
      //    .then((user) => {
      //       console.log(user);
      //       if (user.id) {
      //          loadUser(user);
      //          onRouteChange("home");
      //       }
      //    });
   };

   return (
      <article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 center shadow-2 tc">
         <main className="pa4 black-80 ">
            <form className="measure">
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                     <label className="db fw6 lh-copy f6" htmlFor="email-address">
                        Email
                     </label>
                     <input
                        className="pa2 input-reset ba hover-bg-black bg-near-white hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={onEmailChange}
                     />
                  </div>
                  <div className="mv3">
                     <label className="db fw6 lh-copy f6" htmlFor="password">
                        Password
                     </label>
                     <input
                        className="b pa2 input-reset ba bg-near-white hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={onPassChange}
                     />
                  </div>
               </fieldset>
               <div className="">
                  <input
                     className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                     type="submit"
                     value="Sign in"
                     onClick={onSubmitSignIn}
                  />
               </div>
               <div className="lh-copy mt3">
                  <p
                     onClick={() => onRouteChange("register")}
                     className="f6 link dim black db pointer"
                  >
                     Register
                  </p>
               </div>
            </form>
         </main>
      </article>
   );
};
export default SignIn;
