import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Inbox = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const email = userEmail.replace(/[@.]/g, "");
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(
          `https://mailbox-89432-default-rtdb.firebaseio.com/${email}/inbox.json`
        );
        if (response.ok) {
          const data = await response.json();
          setMails(data);
        } else {
          throw new Error("something went wrong");
        }
      } catch (err) {
        alert("something went wrong");
      }
    };

    fetchMails();
  }, []);

  console.log(mails);

  return (
    <Container className="mt-5">
      <h1 className="">INBOX</h1>
      <ListGroup>
        {Object.keys(mails).map((key) => (
          <ListGroup.Item
            key={key}
            className="m-2"
            style={{
              backgroundColor: "aquamarine",
              border: "1px solid blue",
              borderRadius: "5px",
              display : 'flex',
              justifyContent : 'space-between'
            }}
          >
            {`${mails[key].from} - ${mails[key].subject} - ${mails[key].content}`}{" "}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;
