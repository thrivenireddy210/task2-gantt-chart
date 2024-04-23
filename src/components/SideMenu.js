import React, { useState } from 'react';

function SideMenu({ persons, onItemClick }) {
  return (
    <div className="side-menu">
      <ul>
        {persons.map((person) => (
          <div onClick={() => onItemClick(person)}>
            {person.name}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
