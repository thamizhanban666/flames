import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';
import flamer from './helper/controller';
import MyToaster from './helper/MyToaster';
import { Flip, Bounce, Zoom, Hinge, JackInTheBox, Slide, Roll } from "react-awesome-reveal";
import axios from 'axios'

function App() {
  
  const defaultFlames = [
    {label: "F", value: "Friend"},
    {label: "L", value: "Love"},
    {label: "A", value: "Affection"},
    {label: "M", value: "Marriage"},
    {label: "E", value: "Enemy"},
    {label: "S", value: "Sister"},
  ]
  const [flames, setFlames] = useState(defaultFlames)
  const name1 = useRef()
  const name2 = useRef()
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({});

  const handleClick = async () => {
    if (showResult) return;
    if (!name1.current.value || !name2.current.value) return toast.error('Enter two names');

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
    if (specialChars.test(name1.current.value + name2.current.value)) return toast.error('Enter valid names')

    if (name1.current.value === name2.current.value) return toast.error('Enter different names');
    
    const [removeable, res] = flamer(name1.current.value, name2.current.value);

    removeable.forEach((char,i) => {
      setTimeout(() => {
        setFlames((state) => state.map((obj) => {
          if (obj.label === char) obj.remove = true;
          return obj;
        }))
      }, i*1500);
    })
    setTimeout(() => setShowResult(true), 5 * 1500);

    defaultFlames.forEach((obj) => {
      if (obj.label === res) return setResult(state => obj);
    })

    const postData = {
      name1 : name1.current.value,
      name2 : name2.current.value,
      relationship : result.value
    }
    const {data} = await axios.post('https://636a750dc07d8f936d9e8a7b.mockapi.io/flames', postData);

    name1.current.disabled = true;
    name2.current.disabled = true;
  }

  const handleReset = () => {
    name1.current.disabled = false;
    name2.current.disabled = false;
    setFlames(defaultFlames);
    name1.current.value = '';
    name2.current.value = '';
    setShowResult(false)
  }

  useEffect(() => {
    console.log('rendered')
  })
  
  return (
    <div className='d-flex flex-column justify-content-center align-items-center app'>
      <header className='App-header w-100'>
      <Zoom>FLAMES</Zoom>
      </header>
      <div className='d-flex justify-content-center align-items-center flex-wrap mt-4'>
        <div className='m-3'>
          <label className='me-2'>Name 1 </label>
          <input type='text' ref={name1}/>
        </div>
        <div className='m-3'>
          <label className='me-2'>Name 2 </label>
          <input type='text' ref={name2} />
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center flex-wrap m-4'>
        <JackInTheBox
 direction='down'>
        <button className='m-2' onClick={handleClick}>Show Relationship</button>
        </JackInTheBox>
        <button className='btn btn-danger m-2 p-0 px-2' onClick={handleReset}>Reset</button>
      </div>

      <div className='d-flex justify-content-center align-items-center mt-3'>
        <Zoom cascade damping={0.1} duration='1500' delay={1000}>
        {
          flames.map((obj) => {
            return (
                <div className={`letters ${obj.remove && 'bg-mute'}`} key={obj.value}>
                  {obj.label}
                  <span className={obj.remove && 'cross1'} /><span className={obj.remove && 'cross2'} />
                </div>
            )
          })
        }
        </Zoom>
      </div>

      <div className={`${showResult?'d-block':'d-none'}`}>
        <Bounce duration='2000'>
          <div className='result'>
            The relationship between 
            <b> {name1?.current?.value} </b> and 
            <b> {name2?.current?.value} </b> is
            <span >{result?.value}</span>
          </div>
        </Bounce>
      </div>

      <footer className="footer" >
          <p className='fs-7'>
              ©2022 by Thamizhanban
          </p>
      </footer>

      <MyToaster/>
    </div>
  );
}

export default App;
