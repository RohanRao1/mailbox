import React, { useState,useRef } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Button } from "react-bootstrap";


const ComposeMail = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const inputTo = useRef()
    const inputSubject = useRef()


    const onEditorStateChange = (newEditor) => {
        setEditorState(newEditor)
       
    } 

    const submitHandler = async(event) => {
        event.preventDefault()

        const enteredTo = inputTo.current.value
        const enteredSubject = inputSubject.current.value

        const mail = {
          to : enteredTo,
          sub : enteredSubject,
          content : editorState.getCurrentContent().getPlainText()
        }
        
        const response = await fetch(
          "https://mailbox-89432-default-rtdb.firebaseio.com/mails.json",{
            method : 'POST',
            body : JSON.stringify(mail)
          }
        )

        const data = await response.json()
        console.log(data)
        inputTo.current.value = ''
        inputSubject.current.value = ''
        setEditorState('')
    }



    return (
      <Container>
        <Form onSubmit={submitHandler}>
          <h2 style={{ textAlign: "center", margin: "1rem" }}>
            Compose Your Mail
          </h2>
          <Form.Group controlId="to" className="mb-3">
            <Form.Label >To :</Form.Label>
            <Form.Control type='email' required ref={inputTo} />
          </Form.Group>
          <Form.Group controlId="subject" className="mb-3">
            <Form.Label >Subject :</Form.Label>
            <Form.Control type='text' required ref={inputSubject} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label >Content :</Form.Label> 
            <div style={{backgroundColor : 'lightgray'}}>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </Form.Group>
          <Button type="submit" className="mt-3"> Send</Button>
        </Form>
      </Container>
    );
}

export default ComposeMail