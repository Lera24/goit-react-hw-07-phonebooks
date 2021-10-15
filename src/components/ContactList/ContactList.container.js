import PropTypes from "prop-types";
import { connect } from "react-redux";
import css from "./ContactList.module.css";
import { ContactList } from "./ContactList";
import {
  useFetchContactsQuery,
  useDeleteContactsMutation,
  useFilterContactsQuery,
} from "../../redux/contacts-fetch";

function ContactListContainer({ filter }) {
  const allContacts = useFetchContactsQuery();
  const filterContacts = useFilterContactsQuery(filter, {
    skip: filter === "",
  });
  const [deleteContacts] = useDeleteContactsMutation();
  const { data, isFetching, isError } = filter ? filterContacts : allContacts;

  return (
    <>
      {isFetching && <h3 className={css.title}>Please wait...</h3>}
      {isError && (
        <h3 className={css.title}>
          Sorry, there are unexpected error. Please try again
        </h3>
      )}
      {data && !isFetching && !isError && (
        <ContactList contacts={data} onDeleteContact={deleteContacts} />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  filter: state.contacts.filter,
});

export default connect(mapStateToProps)(ContactListContainer);

ContactListContainer.propTypes = {
  filter: PropTypes.string,
};
