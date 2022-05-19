import { useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const FetchEventSource = () => {
  useEffect(() => {
    fetchEventSource('http://127.0.0.1:8000/events/insights/pressure/', {
      method: 'GET',
      openWhenHidden: true,
      onerror(error) { console.log(error); },
      onmessage(message) {
        const payload = JSON.parse(message.data);

        console.log(payload);
      },
    });
  });

  return <div>Event Source Loaded</div>;
}

export default FetchEventSource;
