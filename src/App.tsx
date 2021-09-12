import React, { useState } from "react";
import "./App.css";

function App() {
  
  const [value, setValue] = useState<string>('');
  const [listPackage, setListPackage] = useState<any[]>([]);
  const [exeTime, setExeTime] = useState<string>('');
  const callApi = async (keyword: string) => {
    try {
      const url = `https://npm.anve.re/docs?app_id=npm-search&index_id=test&limit=12&input=${keyword}`;
      const res = await fetch(url);
      const data = await res.json();
      setListPackage(data.results);
      setExeTime(data.time);
    } catch (e) {
      throw e;
    }
  };

  const handleSearch = (value: string) => {
    if (value) {
      callApi(value);
      setValue(value);
    } else {
      setValue("");
      setListPackage([]);
      setExeTime('');
    }
  };

  return (
    <div className="instantSearch">
      <div className="instantSearch__input">
        <input
          type="text"
          placeholder="Search a package..."
          className="form-control"
          value={value}
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
        />
        Powered by <a href='https://anve.re' target='_blank' rel='noreferrer'>anve.re</a>
      </div>
      <div className="instantSearch__main">
        <p>{exeTime ? `Results in: ${exeTime}` : null}</p>
        <div className="instantSearch__row">
          {listPackage.length > 0 &&
            listPackage.map((item: any) => {
              return (
                <div className="instantSearch__col" key={item.id}>
                  <div className="instantSearch__item">
                    <ul>                        
                      <li className="d-flex pb-10" key={item.id}>
                        <span className="bold black-1 mr-15">
                          name
                        </span>
                        <span className="medium black-1 flex1">
                        <a href={`https://npmjs.com/package/${item.id}`} target='_blank' rel='noreferrer'>{item.id}</a>
                        </span>
                      </li>
                      <li className="d-flex pb-10">
                        <span className="bold black-1 mr-15">description:</span>
                        <span className="medium black-1 flex1">
                          {item.description}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
