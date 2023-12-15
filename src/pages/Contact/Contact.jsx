import React, { useState, useRef } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { MdMailOutline } from "react-icons/md";

import emailjs from "@emailjs/browser";

const Contact = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [error, setError] = useState(null);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nome.length && email.length && messaggio.length) {
      try {
        emailjs
          .sendForm(
            "service_h5vsgoi",
            "template_c0ixuut",
            form.current,
            "3Be9N3UsBN84mygsXcQja"
          )
          .then(
            () => {
              window.location.reload();
            },
            (error) => {
              console.log(error.text);
            }
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Compila tutti i campi");
    }
  };

  return (
    <div className="contact">
      <Navbar type="white" />

      <div className="wrapper">
        <div className="contact__left">
          <h1>Aiutaci a migliorare il nostro servizio.</h1>
          <span><span><MdMailOutline /></span> Invia una mail a <a href="mailto:assistenzamh2023@gmail.com">assistenzamh2023@gmail.com</a></span>
        </div>

        {/* FORM  */}
        <form className="contact__form" ref={form} onSubmit={handleSubmit}>
          <h2>I tuoi dati</h2>
          <span className="contact__form-error">{error && error}</span>
          <div className="contact__form-container">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            placeholder="Messaggio"
            defaultValue={messaggio}
            onChange={(e) => setMessaggio(e.target.value)}
          ></textarea>
          <div className="form-btn">
            <button
              name="invia il form"
              onClick={handleSubmit}
              style={{ cursor: "pointer" }}
            >
              Invia messaggio
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
