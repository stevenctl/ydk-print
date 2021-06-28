import './App.css';
import React from 'react';
import {Router, Route, Switch, useHistory, useLocation} from "react-router";
import {useDropzone} from 'react-dropzone'
import {ReactComponent as UploadIcon} from './upload.svg';
import {dataFromURL, parseYDK} from "./ydk";
import { HashRouter } from 'react-router-dom';

function onChangeHelper(setter) {
  return function (e) {
    setter(e.target.value)
  }
}

function onFileChangeHelper(deckFile, pathSetter) {
  return function (e) {
    pathSetter({...deckFile, path: e.target.value})
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      pathSetter({...deckFile, data: e.target.result})

      console.log(event.target.result);
      debugger
    });
    reader.readAsDataURL(e.target.files[0]);
  }
}


function App() {
  return (
      <HashRouter>
        <Switch>
          <Route path="/print"><Print/></Route>
          <Route path="/ydk-print/print"><Print/></Route>
          <Route><Form/></Route>
        </Switch>
      </HashRouter>
  );
}

function onDrop(history) {
  return function (files) {
    const r = new FileReader();
    // eslint-disable-next-line no-restricted-globals
    r.onload = e => history.push('/ydk-print/print?data=' + e.target.result);
    r.readAsDataURL(files[0]);
  }
}

function Form() {

  return (
    <div className="container">
      <div className="app">
        <Dropzone>
          <UploadIcon/>
          <p>Drag a YDK file here or click to upload</p>
        </Dropzone>
      </div>
    </div>
  );
}

function Dropzone({children}) {
  const history = useHistory();
  const {getRootProps, getInputProps} = useDropzone({onDrop: onDrop(history)})

  return <div {...getRootProps()}>
    <input {...getInputProps()} />
    {children}
  </div>
}

function Print() {
  const location = useLocation();
  const cards = parseYDK(dataFromURL(location));
  const pages = [];
  for (let i = 0; i < cards.length; i+=9) {
    pages.push(cards.slice(i, i + 9))
  }

  return <Dropzone>
    {pages.map(p =>
        <React.Fragment>
        <div className="print-body">
          {p.map(c => <img src={'https://ygoprodeck.com/pics/'+c+'.jpg'} className={'print-card'}/>)}
        </div>
          <footer/>
        </React.Fragment>
    )}
  </Dropzone>

}

export default App;
