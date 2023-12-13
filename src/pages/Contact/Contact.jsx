import React, { useState, useRef } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import emailjs from "@emailjs/browser";

const Contact = () => {
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [error, setError] = useState(null);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nome.length && telefono.length && email.length && messaggio.length) {
      try {
        emailjs
          .sendForm(
            "service_x4osu07",
            "template_c0ixuut",
            form.current,
            "A9K522M2XZ5oy_Z8a"
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

      <form className="contact__form" ref={form} onSubmit={handleSubmit}>
        <h2>I TUOI DATI</h2>
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
            type="text"
            name="phone"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="Messaggio"
          defaultValue={messaggio}
          onChange={(e) => setMessaggio(e.target.value)}
        ></textarea>
        <button
          name="invia il form"
          onClick={handleSubmit}
          style={{ cursor: "pointer" }}
        >
          Invia messaggio
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default Contact;
