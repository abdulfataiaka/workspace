const styles = {
  root: {
    border: '0.08em solid lightgray',
    borderRadius: '0.3em',
    overflow: 'hidden',
  },
  avatar: {
    display: 'block',
    margin: '0 auto',
    height: '10em',
  },
  name: {
    borderTop: '0.08em solid lightgray',
    padding: '1.1em 0.7em',
    fontFamily: 'Verdana',
    fontSize: '0.8em',
    fontWeight: 600,
  },
  email: {
    padding: '0 0.7em 1em',
    fontFamily: 'Verdana',
    fontSize: '0.9em',
  },
};

const Member = ({ name, email, avatar }) => (
  <div style={styles.root}>
  <img src={avatar} alt="Avatar" style={styles.avatar} />
    <div style={styles.name}>{name}</div>
    <div style={styles.email}>{email}</div>
  </div>
);

export default Member;
