import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [firstName, setFirstName] = useState("Coder");
  const [lastName, setLastName] = useState("Byte");
  const [phone, setPhone] = useState(8885559999);

  const onSubmitForm = () => {
    addEntryToPhoneBook({
      firstName,
      lastName,
      phone: Number(phone),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={style.form.container}
    >
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="number"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
        onClick={onSubmitForm}
      />
    </form>
  );
}

function InformationTable({ phoneBook }) {
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
        {phoneBook
          ? phoneBook.map((entry, i) => (
              <tr key={i}>
                <td style={style.tableCell}>{entry.firstName}</td>
                <td style={style.tableCell}>{entry.lastName}</td>
                <td style={style.tableCell}>{entry.phone}</td>
              </tr>
            ))
          : null}
      </thead>
    </table>
  );
}

function Application() {
  const [phoneBook, setPhoneBook] = useState([]);

  const sortByLastName = (array) => {
    return array.sort((a, b) => a.lastName.localeCompare(b.lastName));
  };

  const addEntryToPhoneBook = (newEntry) => {
    setPhoneBook(sortByLastName([...phoneBook, newEntry]));
  };

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phoneBook={phoneBook} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
