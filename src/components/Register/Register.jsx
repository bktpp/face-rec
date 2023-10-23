import { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
   const [registerEmail, setRegisterEmail] = useState("");
   const [registerPass, setRegisterPass] = useState("");
   const [registerName, setRegisterName] = useState("");

   const onEmailChange = (e) => {
      setRegisterEmail(e.target.value);
   };

   const onPassChange = (e) => {
      setRegisterPass(e.target.value);
   };
   const onNameChange = (e) => {
      setRegisterName(e.target.value);
   };

   const onSubmitRegister = (e) => {
      e.preventDefault();
      fetch("http://localhost:3000/register", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            email: registerEmail,
            password: registerPass,
            name: registerName,
         }),
      })
         .then((resp) => resp.json())
         .then((user) => {
            console.log(user);
            if (user.id) {
               loadUser(user);
               onRouteChange("home");
            }
         });
   };

   return (
      <article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 center shadow-2 tc">
         <main className="pa4 black-80 ">
            <form className="measure">
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f2 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                     <label className="db fw6 lh-copy f6" htmlFor="name">
                        Name
                     </label>
                     <input
                        className="pa2 input-reset ba bg-near-white hover-bg-black hover-white w-100"
                        type="text"
                        name="name"
                        id="user-name"
                        onChange={onNameChange}
                     />
                  </div>
                  <div className="mv3">
                     <label className="db fw6 lh-copy f6" htmlFor="email">
                        Email
                     </label>
                     <input
                        className="b pa2 input-reset ba bg-near-white  hover-bg-black hover-white w-100"
                        type="email"
                        name="email"
                        id="user-email"
                        onChange={onEmailChange}
                     />
                  </div>
                  <div className="mv3">
                     <label className="db fw6 lh-copy f6" htmlFor="email">
                        Password
                     </label>
                     <input
                        className="b pa2 input-reset ba bg-near-white  hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="user-password"
                        onChange={onPassChange}
                     />
                  </div>
               </fieldset>
               <div className="">
                  <input
                     className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                     type="submit"
                     value="Register"
                     onClick={onSubmitRegister}
                  />
               </div>
            </form>
         </main>
      </article>
   );
};
export default Register;
