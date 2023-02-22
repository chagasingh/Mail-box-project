// import classes from './ForgotPassword.module.css';
// import { useRef,useState} from 'react';
// // import { useHistory } from 'react-router-dom'

// const ForgotPassword = () => {

//   const emailInputRef=useRef();

//   const [isLoading,setIsLoading] = useState(false)

//   const submitHandler=(event)=>{
//     event.preventDefault();

//     const enteredEmail=emailInputRef.current.value;
//     setIsLoading(true)
//     fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         requestType:"PASSWORD_RESET",
//         email:enteredEmail,
//       }),
//       headers: {
//         'Content-Type': "application/json",
//       },
//     }
//     )
//     .then((res) => {
//       if (res.ok) {
//         setIsLoading(false)
//         return res.json();
//       } else {
//         return res.json().then((data) => {
//           let erroMessage = "Authentication failed!";
//           if (data && data.error && data.error.message) {
//             erroMessage = data.error.message;
//           }
//           throw new Error(erroMessage);
//         });
//       }
//     })
//     .then((data) => {
//       console.log("forgot password req send");
//     })
//     .catch((err) => {
//       alert(err.message);
//     });

//   };
//   return (
//     <form className={classes.form} onSubmit={submitHandler}>
//       <div className={classes.text}><h1>Check your Mail for password Reset...</h1><br/></div>
//       <div className={classes.control}>
//         <label htmlFor='email'>Your Email:</label>
//         <input type='email' id='email' required ref={emailInputRef}/>
//       </div>
//       <div className={classes.action}>
//         {!isLoading && <button>Send Mail</button>}
//         {isLoading && <p>Sending request...</p>}
//       </div>
//     </form>
//   );
// }

// export default ForgotPassword;