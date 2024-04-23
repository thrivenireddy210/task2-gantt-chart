import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import { DataProvider } from './DataContext';
import Table from './Table';
import GanttChartPage from './GanttChartPage';
import { useData } from './DataContext';
import statictask from './components/data';
import { FaSearch, FaFilter, FaSort, FaUser, FaEyeSlash, FaTimes, FaBars } from 'react-icons/fa'; 

const personmenu = [
  { person: 'Laddu' },
  { person: 'anji' },
  { person: 'rama' },
  { person: 'santhu' },
  { person: 'Deepu' },
  { person: 'sree' },
  { person: 'John Doe' },
  { person: 'John Doe' }
];

function App() {
  const { data: originalData, setData } = useData();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showHideMenu, setShowHideMenu] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    checkbox: false,
    item: false,
    person: false,
    status: false,
    timeline: false,
    dependency: false,
    tags: false
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);


  const handlePersonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleHideMenuClick = () => {
    setShowHideMenu(!showHideMenu);
  };

  const handleCancelClick = () => {
    const filteredData = statictask?.filter(item => item.person !== null);
    setData(filteredData);
    setSelectedPerson(null);
  };

  const handlePersonSelection = (person) => {
    setSelectedPerson(person?.name);
    const filteredData = statictask?.filter(item => item.person === person?.name);
    setData(filteredData);
    setShowMenu(false);
  };

  const handleColumnToggle = (columnName) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [columnName]: !prevState[columnName]
    }));
  };

  const handleSortClick = () => {
    setShowSortMenu(!showSortMenu);
  };

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
    setShowSortMenu(false);
  };

 

  const handleSearch = () => {
    setShowSearchInput(true);
  
    
   
    }
  
    

  useEffect(() => {
    if (sortColumn) {
      const sortedData = [...originalData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
      setData(sortedData);
    }
  }, [sortColumn, sortDirection, setData, originalData]);

  const handleOutsideClick = (event) => {
    if (showSortMenu && !event.target.closest('.sort-menu')) {
      setShowSortMenu(false);
    }
  };
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };
  
  useEffect(() => {
    let timeoutId;
  
    if (searchQuery.trim().length >= 2) {
      timeoutId = setTimeout(() => {
        const filteredData = statictask.filter(item => {
          for (let key in item) {
            if (item.hasOwnProperty(key) && typeof item[key] === 'string' && item[key].toLowerCase().includes(searchQuery.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
        setData(filteredData);
      }, 200); 
    } else {
      setData(statictask);
    }
  
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  
  
  return (
    <DataProvider>
      <Router>
        <div className="container mt-5" onClick={handleOutsideClick}>
          <div className="d-flex align-items-center">
            <NavLink to="/" className="nav-link" activeClassName="active">Tables</NavLink>
            <NavLink to="/gantt-chart" className="nav-link" activeClassName="active">Gantt Chart</NavLink>
          </div>
          <hr />
          <div className="d-flex mt-2 align-items-center" style={{ cursor: 'pointer' }}>
            <button className="btn btn-primary mb-0 me-4" style={{ padding: '0.275rem 0.45rem' }}>New item</button>
            {!showSearchInput ? (
  <span className='me-5'style={{ cursor: 'pointer' }} onClick={handleSearch}>
    <FaSearch /> Search
    
  </span>
) : (
  <input
    type="text"
    placeholder="Search"
    value={searchQuery}
    onChange={handleSearchChange}
    className="form-control mb-0 me-5"
    onBlur={() => setShowSearchInput(false)}
    autoFocus 
    style={{ paddingLeft: '30px', width: '150px' }} 
  />
)}

            <p className="mb-0 me-5">
              <FaFilter /> Filter
            </p>
            <p className="mb-0 me-5" onClick={handleSortClick}>
              <FaSort /> Sort
            </p>
            {showSortMenu && (
  <div className="sort-menu" style={{ position: 'absolute', left: '30%', top: '20%', backgroundColor: '#fff', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', zIndex: 1 }}>
    <h4 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Select Column to Sort</h4>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li onClick={() => handleSort('item')} className="sort-menu-item">Item</li>
      <li onClick={() => handleSort('person')} className="sort-menu-item">Person</li>
      <li onClick={() => handleSort('status')} className="sort-menu-item">Status</li>
      <li onClick={() => handleSort('timeline')} className="sort-menu-item">Timeline</li>
      <li onClick={() => handleSort('dependency')} className="sort-menu-item">Dependency</li>
      <li onClick={() => handleSort('tags')} className="sort-menu-item">Tags</li>
    </ul>
  </div>
)}
            <p className="mb-0 me-5" onClick={handlePersonClick} >
              <FaUser /> {selectedPerson !== null ? (
                <>
                  {selectedPerson} <FaTimes onClick={handleCancelClick} />
                </>)
                : "Person"}
            </p>
            {showMenu && (
              <div className="absolute top-8 left-0">
                <PersonMenu
                  persons={personmenu.map(item => ({ name: item.person }))}
                  onItemClick={handlePersonSelection}
                />
              </div>
            )}
            <p className="mb-0 me-5" onClick={handleHideMenuClick}>
              <FaEyeSlash /> Hide
            </p>
            {showHideMenu && (
              <ColumnVisibilityMenu
                columnVisibility={columnVisibility}
                onColumnToggle={handleColumnToggle}
              />
            )}
          </div>
          <Routes>
            <Route path="/" element={<TablesPage data={originalData} setData={setData} columnVisibility={columnVisibility} />} />
            <Route path="/gantt-chart" element={<GanttChartPage tasks={originalData} setTasks={setData}/>} />
          </Routes>
        </div>
      </Router>
    </DataProvider>  
  );
}

function ColumnVisibilityMenu({ columnVisibility, onColumnToggle }) {
  return (
    <div className="hide-menu" style={{ position: 'absolute', top: '15%', left: '48%', backgroundColor: '#fff', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', padding: '10px' }}>
      <h4>Hide Columns</h4>
      {Object.entries(columnVisibility).map(([columnName, isVisible]) => (
        <div key={columnName} style={{ marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={isVisible}
            onChange={() => onColumnToggle(columnName)}
          />
          <label style={{ marginLeft: '8px' }}>{columnName}</label>
        </div>
      ))}
    </div>
  );
}

function PersonMenu({ persons, onItemClick }) {
  return (
    <div className="hide-menu" style={{ position: 'absolute', top: '20%', left: '28%', backgroundColor: '#fff', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ marginBottom: '10px' }}>Select Person</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width:'350px' }}>
        {persons.map((person, index) => (
          <button key={index} onClick={() => onItemClick(person)} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9', cursor: 'pointer', marginBottom: '8px' }}>
            {person.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function TablesPage({ data, setData, columnVisibility }) {
  return (
    <div className='mt-2'>
      <Table tableName="Fundamentals-phase1" data={data} setData={setData} columnVisibility={columnVisibility} />
      <Table tableName="Advanced" data={data} setData={setData} columnVisibility={columnVisibility} />
      <Table tableName="Professional Settings" data={data} setData={setData} columnVisibility={columnVisibility} />
    </div>
  );
}

export default App;
