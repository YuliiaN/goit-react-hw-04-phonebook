import { useState, useEffect } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addName = ({ name, number }) => {
    const isRepeated = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isRepeated) {
      alert(`${isRepeated.name} is already in contacts`);
      return false;
    }

    const contact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, contact]);
    return true;
  };

  const deleteName = id => {
    const newContacts = contacts.filter(item => item.id !== id);
    setContacts([...newContacts]);
  };

  const handleFilter = filter => {
    setFilter(filter);
  };

  const selectedContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Section title="Phonebook">
        <Form getValue={addName}></Form>
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Filter
              title="Find contacts by name"
              filterContacts={handleFilter}
            />
            <ContactsList
              findContact={selectedContacts}
              deleteContact={deleteName}
            />
          </>
        ) : (
          <p>Your phonebook is empty</p>
        )}
      </Section>
    </>
  );
};
