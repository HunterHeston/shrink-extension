import React from 'react';
import { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [shortURL, setShortURL] = React.useState('Loading...');
  // fetch("https://gin-render-test-project.onrender.com/new?url=hunterheston.com").then(res => res.json()).then(data => setShortURL(data.url));

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      fetch("https://gin-render-test-project.onrender.com/new?url=" + url)
        .then(res => res.json())
        .then(data => {
          setShortURL(data.url)

          const type = "text/plain";
          const blob = new Blob([data.url], { type });
          const ci = [new ClipboardItem({ [type]: blob })];
          navigator.clipboard.write(ci);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a href={shortURL}>{shortURL}</a>
      </header>
    </div>
  );
};

export default Popup;
