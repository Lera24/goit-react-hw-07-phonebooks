import ContactListContainer from "./components/ContactList/ContactList.container";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import "./App.css";

export default function App() {
  return (
    <div className="wrap">
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <h2 className="title">Contacts</h2>
      <Filter />
      <ContactListContainer />
    </div>
  );
}
