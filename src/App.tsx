import React, { useState } from "react";
import parse from "html-react-parser";
import "./App.css";

function App() {
  
  const [value, setValue] = useState<string>('');
  const [listPackage, setListPackage] = useState<any[]>([]);

  const callApi = async (keyword: string) => {
    try {
      const url = `https://fast-npm-search.xyz/packages?input=${keyword}`;
      const res = await fetch(url);
      const data = await res.json();
      setListPackage(data.results);
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
        fast-npm-search.xyz | Powered by <a href='https://anve.re' target='_blank'>anve.re</a>
      </div>
      <div className="instantSearch__main">
        <div className="instantSearch__row">
          {listPackage.length > 0 &&
            listPackage.map((item: any) => {
              return (
                <div className="instantSearch__col" key={item.package.id}>
                  <div className="instantSearch__item">
                    <ul>
                      {item.highlights.map((highlight: any) => {
                        return (
                          <li className="d-flex pb-10" key={highlight.field}>
                            <span className="bold black-1 mr-15">
                              {highlight.field}:
                            </span>
                            <span className="medium black-1 flex1">
                            {highlight.field == 'name' ? 
                              <a href={`https://npmjs.com/package/${item.package.id}`} target='_blank'>{parse(highlight.value)}</a>
                              : parse(highlight.value)
                            }
                            </span>
                          </li>
                        );
                      })}
                      <li className="d-flex pb-10">
                        <span className="bold black-1 mr-15">description:</span>
                        <span className="medium black-1 flex1">
                          {item.package.description}
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
