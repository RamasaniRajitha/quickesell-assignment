import { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board';
import Navbar from './Components/Navbar';
import { priorities, status } from './Utils/data';


function App() {

  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const defaultGroup = localStorage.getItem('selectedGroup');
  const defaultOrder = localStorage.getItem('selectedOrder');

  const [group, setGroup] = useState(defaultGroup ? defaultGroup : 'status');
  const [order, setOrder] = useState(defaultOrder ? defaultOrder : 'priority');

  const handleGroupChange = (groupSelected) => {
    setGroup(groupSelected);
    localStorage.setItem("selectedGroup", groupSelected);
  }
  const handleOrderChange = (orderSelected) => {
    setOrder(orderSelected);
    localStorage.setItem("selectedOrder", orderSelected);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await res.json();
      setTickets(data.tickets);
      setUsers(data.users);
      console.log(data);
    } catch (error) {
      console.log("Unable to fetch data! ", error);
    }
  }


  return (
    <div className="app container">
      <Navbar group={group} order={order} onGroupchange={handleGroupChange} onOrderChange={handleOrderChange} />
      <div className='boards container'>
        <div className='boards'>
          {
            group === 'status' && status.map((opt, id) => (
              <Board order={order} data={opt} key={id} tickets={tickets} users={users} group={group} />
            ))
          }
          {
            group === 'user' && users.map((opt) => (
              <Board order={order} data={opt} key={opt.id} tickets={tickets} users={users} group={group} userId={opt?.id} />
            ))
          }
          {
            group === 'priority' && priorities.map((opt, id) => (
              <Board order={order} data={opt} level={id} key={id} tickets={tickets} users={users} group={group} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
