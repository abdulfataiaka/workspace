import { useEffect, useState } from 'react';


const EventSourceClient = () => {
  const [stocks, setStocks] = useState([]);

  const fetchData = () =>
    fetch('http://127.0.0.1:18000/stocks').then(response => response.json()).then(({ data }) => setStocks(data));

  useEffect(() => {
    fetchData();

    const source = new EventSource('http://127.0.0.1:18000/updates');

    source.onopen = (event) => {
      console.log('Stream Opened');
    }

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setStocks(current => current.map(s => s.id === data.id ? data : s));
    }

    return () => { console.log('Closed'); source.close() };
  }, [])

  return (
    <div>
      {stocks.length === 0 && <div>No stock entires at the moment</div>}
      {stocks.map(({ id, ticker, price }) => (
        <div key={id} style={{ textAlign: 'center', marginBottom: '1em' }}>
          {ticker} ({price})
        </div>
      ))}
    </div>
  );
};

export default EventSourceClient;
