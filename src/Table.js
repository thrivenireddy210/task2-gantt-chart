import React, { useEffect, useState } from 'react';
import { useData } from './DataContext';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function Table({ tableName ,data, setData,columnVisibility }) {
  const [selectedCellId, setSelectedCellId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userImages, setUserImages] = useState({});
  const [newItemPerson, setNewItemPerson] = useState('');
  const [newItemStatus, setNewItemStatus] = useState('');
  const [newItemTimeline, setNewItemTimeline] = useState('');
  const [newItemDependency, setNewItemDependency] = useState('');
  const [newItemTags, setNewItemTags] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const handleDateSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setStartDate(startDate);
    setEndDate(endDate);
    applySelectedDates(startDate, endDate);
    setSelectedCellId(null); 
  };

  useEffect(() => {
    fetchUserImages();
  }, []);
console.log("columnVisibility",columnVisibility)
  const fetchUserImages = async () => {
    try {
      const response = await fetch('https://api.unsplash.com/photos/random?count=10&query=portrait', {
        headers: {
          Authorization: 'Client-ID rotoDwd-ys7g_EZJckoZJuQfCNbDDDTVz65UY85IB-8'
        }
      });
      if (response.ok) {
        const imagesData = await response.json();
        const images = imagesData.map(image => ({
          id: image.id,
          url: image.urls.small
        }));
        setUserImages(images);
      } else {
        throw new Error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleCellClick = (id) => {
    setSelectedCellId(id);
    const cellData = data.find(item => item.id === id);
    if (cellData) {
      setStartDate(cellData.timeline[0]);
      setEndDate(cellData.timeline[1]);
    }
  };

  const applySelectedDates = (startDate, endDate) => {
    if (selectedCellId !== null) {
      const newData = data.map(item => {
        if (item.id === selectedCellId) {
          return { ...item, timeline: [startDate, endDate] ,start:startDate,end:endDate };
        }
        return item;
      });
      setData(newData);
    }
  };


  const formatDate = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const month = startDate.toLocaleString('default', { month: 'short' });
    return `${startDay}-${endDay} ${month}`;
  };

  const { length: imagesCount } = userImages;

  const getRandomUserImage = () => {
    if (imagesCount > 0) {
      const randomIndex = Math.floor(Math.random() * imagesCount);
      return userImages[randomIndex].url;
    }
    return ''; 
  };

  const getStatusCellStyle = (status) => {
    switch (status) {
      case 'Fundamental':
        return { backgroundColor: 'brown', color: 'white' };
      case 'In Progress':
        return { backgroundColor: 'orange', color: 'white' };
      case 'Stuck':
        return { backgroundColor: 'red', color: 'white' };
      case 'Yet to Begin':
        return { backgroundColor: 'black', color: 'white' };
      case 'Done':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return {};
    }
  };

  let tableStyle = {};
  let headingStyle = {};
  switch (tableName) {
    case 'Fundamentals-phase1':
      tableStyle = { borderLeft: '10px solid green' };
      headingStyle = { color: 'green' };
      break;
    case 'Advanced':
      tableStyle = { borderLeft: '10px solid blue' }; 
      headingStyle = { color: 'blue' };
      break;
    case 'Professional Settings':
      tableStyle = { borderLeft: '10px solid pink' };
      headingStyle = { color: 'pink' };
      break;
    default:
      break;
  }
  const handleKeyPress = (e, id) => {
    console.log("darlijgsj", newItemName, newItemPerson, newItemStatus)
    if (e.key === 'Enter') {
      const newItem = {
        id: data.length + 1,
        name: newItemName,
        person: newItemPerson,
        status: newItemStatus,
        timeline: newItemTimeline,
        dependency: newItemDependency,
        tags: newItemTags,
      };
      const newData = [...data, newItem];

      setData(newData);
      setNewItemName('');
      setNewItemPerson('');
      setNewItemStatus('');
      setNewItemTimeline('');
      setNewItemDependency('');
      setNewItemTags('');

      
      
    }
  };
  const handleItemNameChange = (e, id) => {
    const newName = e.target.value;
    const newData = data.map(row => {
      if (row.id === id) {
        return { ...row, name: newName };
      }
      return row;
    });
    setData(newData);
  };
  
  return (
    <div className="table-container">
      <h4 style={headingStyle}>{tableName}</h4>
      {selectedCellId !== null && (
        <div className="date-range-picker-container" style={{ zIndex: 100, position: 'absolute' }}>
          <DateRangePicker
            ranges={[{ startDate, endDate, key: 'selection' }]}
            onChange={handleDateSelect}
            showDateDisplay={false}
            showSelectionPreview={false}
          />
        </div>
      )}
      <table className="table table-bordered table-hover" style={tableStyle}>
        <thead>
        <tr>
            {columnVisibility.checkbox==false && <th><input type="checkbox" /></th>}
            {columnVisibility.item==false && <th>Item</th>}
            {columnVisibility.person==false && <th>Person</th>}
            {columnVisibility.status==false && <th>Status</th>}
            {columnVisibility.timeline==false && <th>Timeline</th>}
            {columnVisibility.dependency==false && <th>Dependency</th>}
            {columnVisibility.tags==false && <th>Tags</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
               {columnVisibility.checkbox==false && <td><input type="checkbox" /></td>}
              {columnVisibility.item ==false&& 
              <td>
             <input
  type="text"
  value={item.name}
  onChange={(e) => handleItemNameChange(e, item.id)}
  className="input-no-border"
/>

            </td>
            
              }
              {columnVisibility.person==false && (
                  <td className='select-container' >
                  <div className="d-flex align-items-center"  >
                    {getRandomUserImage() ? (
                      <img src={getRandomUserImage()} alt={item.person} className="rounded-circle me-2" width="30" height="30" />
                    ) : (
                      <div className="rounded-circle me-2" style={{ width: '30px', height: '30px', backgroundColor: '#ccc' }} />
                    )} 
                    <select
                      value={item.person}
                      onChange={(e) => {
                        const newPerson = e.target.value;
                                                 const newData = data.map(row => {
                            if (row.id === item.id) {
                              return { ...row, person: newPerson };
                            }
                            return row;
                          });
                          setData(newData);
                        
                       
                      }}
                      className="select-name select-no-border "
  
                    >
                      {data?.map((item) => (
                        <option value={item?.person} style={{ color: 'black' }}>{item?.person}</option>
                      ))}
  
                    </select>
                  </div>
                </td>
               
              )}
              {columnVisibility.status==false && (
              <td style={{  ...getStatusCellStyle(item.status) }}>
                <select
                  value={item.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    const newData = data.map(row => {
                      if (row.id === item.id) {
                        return { ...row, status: newStatus };
                      }
                      return row;
                    });
                    setData(newData);
                  }}
                  className="select-status select-no-border"
                >
                  <option value="Fundamental" style={{ backgroundColor: 'brown', color: 'white' }}>Fundamental</option>
                  <option value="In Progress" style={{ backgroundColor: 'orange', color: 'white' }}>In Progress</option>
                  <option value="Stuck" style={{ backgroundColor: 'red', color: 'white' }}>Stuck</option>
                  <option value="Yet to Begin" style={{ backgroundColor: 'black', color: 'white' }}>Yet to Begin</option>
                  <option value="Done" style={{ backgroundColor: 'green', color: 'white' }}>Done</option>
                </select>
              </td>
              )}
               {columnVisibility.timeline ==false&&(
              <td onClick={() => handleCellClick(item.id)} style={{ cursor: 'pointer' }}>
                {formatDate(item.timeline[0], item.timeline[1])}
              </td>
               )}
                {columnVisibility.dependency ==false&&(
              <td className='input-no-border'contentEditable="true" style={{ color: 'white' }}>{ <span style={{ backgroundColor: '#add8e6', borderRadius: '10px', padding: '2px 10px', display: 'inline-block' }}>{item.dependency}</span>}</td>
                )}{columnVisibility.tags==false &&(
                  // <td contentEditable="true" style={{ color: 'white' }}>{item.tags && <span style={{ backgroundColor: '#add8e6', borderRadius: '10px', padding: '2px 10px', display: 'inline-block' }}>
                  // <select
                  //     value={item.tags}
                  //     onChange={(e) => {
                  //       const newStatus = e.target.value;
                  //       const newData = data.map(row => {
                  //         if (row.id === item.id) {
                  //           return { ...row, tags: newStatus };
                  //         }
                  //         return row;
                  //       });
                  //       setData(newData);
                  //     }}
                  //     className="select-status select-no-border"
                  //   >
                  //      {data?.map((item) => (
                  //         <option value={item?.tags} style={{ color: 'black' }}>{item?.tags}</option>
                  //       ))}
                  //   </select></span>}</td>
                  <td style={{ backgroundColor: '#add8e6', borderRadius: '10px', padding: '2px 10px', display: 'inline-block' }}>
                  <select

                    value={item.tags}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      const newData = data.map(row => {
                        if (row.id === item.id) {
                          return { ...row, tags: newStatus };
                        }
                        return row;
                      });
                      setData(newData);
                    }}
                    className="select-status  select-no-border"
                  >
                   {data?.map((item) => (
                        <option value={item?.tags} style={{ color: 'black' }}>{item?.tags}</option>
                      ))}
                  </select>
                </td>
                )}

              </tr>

          ))}
           <tr>
            <td><input type="checkbox" disabled checked={false} /></td>
            <td><input style={{ width: "130px", color: "black" ,textAlign:'center'}} type='text' onKeyDown={(e) => handleKeyPress(e, data.length + 1)} value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder='Add item' /></td>
            <td contentEditable="true" onKeyDown={(e) => handleKeyPress(e, data.length + 1)}>{newItemPerson}</td>
            <td contentEditable="true" onKeyDown={(e) => handleKeyPress(e, data.length + 1)}>{newItemStatus}</td>
            <td contentEditable="true" onKeyDown={(e) => handleKeyPress(e, data.length + 1)}>{newItemTimeline}</td>
            {columnVisibility.dependency ==false&&(
              <td className='input-no-border'contentEditable="true"  onKeyDown={(e) => handleKeyPress(e, data.length + 1)} style={{ color: 'white' }}>{ <span style={{ backgroundColor: '#add8e6', borderRadius: '10px', padding: '2px 10px', display: 'inline-block' }}>{newItemDependency}</span>}</td>
                )}
            <td contentEditable="true" onKeyDown={(e) => handleKeyPress(e, data.length + 1)}>{newItemTags}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
