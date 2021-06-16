import React, {useState} from 'react';
import './App.css';

function App() {

  const [value, setValue] = useState<string>('');
  const [listPackage, setListPackage] = useState<any[]>([]);

  const callApi = async (keyword: string) => {
    try {
      const url = `https://fast-npm-search.xyz/packages?input=${keyword}`;
      const res = await fetch(url);
      const data = await res.json();
      setListPackage(data.packages)
    } catch (e) {
      throw e
    }
  };

  const handleSearch = (value: string) => {
    if (value) {
      callApi(value);
      setValue(value);
    } else {
      setValue('');
      setListPackage([]);
    }

  };

  return (
      <div className="instantSearch">
        <div className="instantSearch__input">
          <input type="text" placeholder="Search..." className="form-control" value={value}
                 onChange={event => {
                   handleSearch(event.target.value)
                 }}/>
        </div>
        <div className="instantSearch__main">
          <div className="instantSearch__row">
            {
              listPackage.length > 0 && listPackage.map((item: any) => {
                return <div className="instantSearch__col" key={item.id}>
                  <div className="instantSearch__item">
                    <ul>
                      <li className='d-flex pb-10'>
                        <span className='bold black-1 mr-15'>name:</span>
                        <span className="medium black-1 flex1">{item.name}</span>
                      </li>
                      <li className='d-flex pb-10'>
                        <span className='bold black-1 mr-15'>description:</span>
                        <span className="medium black-1 flex1">{item.description}</span>
                      </li>
                      <li className='d-flex pb-10'>
                        <span className='bold black-1 mr-15'>downloads:</span>
                        <span className="medium black-1 flex1">{item.downloads}</span>
                      </li>
                      <li className='d-flex pb-10'>
                        <span className='bold black-1 mr-15'>id:</span>
                        <span className="medium black-1 flex1">{item.id}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>

  );
}

export default App;
