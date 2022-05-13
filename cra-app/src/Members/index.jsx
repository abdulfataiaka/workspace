import { useEffect, useState } from 'react';
import Member from './Member';

const styles = {
  root: {
    width: '90%',
    height: '90%',
    margin: '2% auto',
  },
  member: {
    display: 'inline-block',
    width: '20%',
    margin: '0 2.5% 2em',
  }
};

const fetchMembers = () =>
  fetch('https://reqres.in/api/users?page=2')
    .then((response) => response.json())
    .then(({ data }) => data);

const Members = () => {
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    fetchMembers().then(data => setMembers(data));
  }, []);

  return (
    <div style={styles.root}>
      {members.length === 0 && (
        <div style={{ textAlign: 'center' }}>No Members Available</div>
      )}
      {members.map(({ id, email, first_name, last_name, avatar }) => (
        <div key={id} style={styles.member}>
          <Member
            email={email}
            avatar={avatar}
            name={`${last_name} ${first_name}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Members;
