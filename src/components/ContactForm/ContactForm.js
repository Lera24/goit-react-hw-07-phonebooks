import { useState } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import css from "./ContactForm.module.css";
import { useCreateContactMutation } from "../../redux/contacts-fetch";

function ContactForm({ contacts }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [createContact] = useCreateContactMutation();

  const inputNameId = shortid.generate();
  const inputTelId = shortid.generate();

  const findCurrentValue = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;

      case "number":
        setNumber(e.target.value);
        break;

      default:
        return;
    }
  };

  const addContact = (e) => {
    e.preventDefault();
    contacts && contacts.find((contact) => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : createContact({ name, number });

    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={addContact} className={css.wrap}>
      <label htmlFor={inputNameId}>
        Name
        <input
          className={css.input}
          onChange={findCurrentValue}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          id={inputNameId}
        />
      </label>
      <label htmlFor={inputTelId}>
        Number
        <input
          className={css.input}
          onChange={findCurrentValue}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          id={inputTelId}
        />
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  const valueState = state.contactsApi.queries;
  const fetchName = Object.keys(valueState);
  const result =
    state.contacts.filter === ""
      ? valueState[`${fetchName[0]}`]
      : valueState[`${fetchName[1]}`];

  return {
    contacts: result ? result.data : [],
  };
};

export default connect(mapStateToProps)(ContactForm);

ContactForm.propTypes = {
  contacts: PropTypes.array,
};
