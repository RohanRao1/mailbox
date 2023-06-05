import React,{ useRef, useState} from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication";


const Login = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const cPasswordInputRef = useRef()
   const history = useHistory()
   const dispatch = useDispatch()


    const submitHandler = async(event) => {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        setLoading(true)
       
        if(isLogin) {
      const response = await fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhkx7b-6t4YtPaRWu1j7w6bCblfhy0iFM",
         {
           method: "POST",
           body: JSON.stringify({
             email: enteredEmail,
             password: enteredPassword,
             returnSecureToken: true,
           })
         }
       ) 
       setLoading(false)
         if(response.ok){
          const data = await response.json();
          console.log(data);
          dispatch(authActions.login({token : data.idToken, email : data.email}))
          history.replace('/welcomepage')
         } else {
          const data = await response.json()
          alert(data.error.message)
         }


    } 
    else {
      try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhkx7b-6t4YtPaRWu1j7w6bCblfhy0iFM", {
          method : 'POST',
          body : JSON.stringify({
            email : enteredEmail,
            password : enteredPassword,
            returnSecureToken : true
          }) 
        }
      ) 
      setLoading(false)
      if (response.ok){
          const data = await response.json()
          alert('user registered successfully')
      }
      else {
        const data = await response.json()
       alert(data.error.message)
      }
      }
      catch(error) {
        console.log(error)
      }
       
    }

    emailInputRef.current.value = ''
    passwordInputRef.current.value = ''
    cPasswordInputRef.current.value = ''

    }

    const resetPassword = () => {
        history.push('/changepassword')
    }

    const toggleHandler = () => {
      setIsLogin(prev => !prev)
    }

    

   return (
     <div>
       <Container className="mt-1">
         <Row className="container justify-content-center m-5">
           {/* Add justify-content-center class to center the row */}
           <Col lg={5}>
             <Card className="conatiner shadow-lg m-5">
               <Card.Body>
                 <Form className="container" onSubmit={submitHandler}>
                   <Card.Header className="p-3" style={{ textAlign: "center" }}>
                     <h4>{isLogin ? "Login" : "Signup"}</h4>
                   </Card.Header>
                   <Form.Group className="m-2">
                     <Form.Control
                       type="text"
                       placeholder="Email"
                       ref={emailInputRef}
                     />
                   </Form.Group>

                   <Form.Group className="m-2">
                     <Form.Control
                       type="password"
                       placeholder="Password"
                       ref={passwordInputRef}
                     />
                   </Form.Group>

                   <Form.Group className="m-2">
                     <Form.Control
                       type="password"
                       placeholder="ConfirmPassword"
                       ref={cPasswordInputRef}
                     />
                   </Form.Group>
                   <div>
                     {loading ? (
                       "loading..."
                     ) : (
                       <Button
                         className="mt-2"
                         style={{ marginLeft: "45%" }}
                         type="submit"
                       >
                         {isLogin ? "Login" : "Signup"}
                       </Button>
                     )}
                   </div>
                   <div>
                     <Button
                       className="col-md-12 mt-3 text-primary"
                       style={{
                         border: "none",
                         backgroundColor: "transparent",
                         color: "black",
                       }}
                       type="button"
                       onClick={resetPassword}
                     >
                       {isLogin
                         ? "Forgot Password"
                         : ""}
                     </Button>
                   </div>
                   <div>
                     <Button
                       className="col-md-12 mt-3 text-primary"
                       style={{
                         border: "none",
                         backgroundColor: "transparent",
                         color: "black",
                       }}
                       type="button"
                       onClick={toggleHandler}
                     >
                       {isLogin
                         ? "Create New Account"
                         : "Login With Existing Account"}
                     </Button>
                   </div>
                 </Form>
               </Card.Body>
             </Card>
           </Col>
         </Row>
       </Container>
     </div>
   );
}


export default Login