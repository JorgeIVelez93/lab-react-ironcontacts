import "./App.css";
import React from "react";
import contacts from "./contacts.json";

function App() {
  const [celebs, setContacts] = React.useState(contacts.slice(0, 5));
  const [remaining, setRemaining] = React.useState(
    contacts.slice(5, contacts.length - 5)
  );
  const [ascending, setAscending] = React.useState("");

  const addContact = () => {
    let num = Math.floor(Math.random() * remaining.length);
    let clonedContacts = [...celebs];
    let remainingCopy = [...remaining];

    if (remainingCopy.length > 0) {
      setContacts(clonedContacts.concat(remainingCopy[num]));
      remainingCopy.splice(num, 1);
      setRemaining(remainingCopy);
    }
  };

  const sortName = () => {
    let cloneArr = [...celebs];

    cloneArr.sort(function (a, b) {
      if (ascending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setAscending(!ascending);
    setContacts(cloneArr);
  };
  const sortPopularity = () => {
    let cloneArr = [...celebs];

    cloneArr.sort(function (a, b) {
      if (ascending) {
        return a.popularity - b.popularity;
      } else {
        return b.popularity - a.popularity;
      }
    });
    setAscending(!ascending);
    setContacts(cloneArr);
  };
  const deleteContact = (celebtoRemove) => {
    let filteredArr = celebs.filter(function (singleCeleb) {
      return singleCeleb.id !== celebtoRemove;
    });
    let filtereCeleb = celebs.find(function (singleCeleb) {
      return singleCeleb.id === celebtoRemove;
    });
    setContacts(filteredArr);
    setRemaining(remaining.concat(filtereCeleb));
  };
  return (
    <div>
      <button className="navButton" onClick={addContact}>
        Add Random Contact
      </button>
      <button className="navButton" onClick={sortName}>
        Sort by Name
      </button>
      <button className="navButton" onClick={sortPopularity}>
        Sort by Popularity
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {celebs.map(function (contact) {
            return (
              <tr className="rows">
                <td>
                  <img src={contact.pictureUrl} alt="celeb"></img>
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td className="trophy">{contact.wonEmmy && " 🏆"}</td>
                <td className="trophy">{contact.wonOscar && " 🏆"}</td>
                <td>
                  <button
                    className="deleteCeleb"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
