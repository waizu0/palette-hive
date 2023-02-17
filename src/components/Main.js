import React, { useState, useRef, useEffect } from 'react';
import ColorThief from 'colorthief';
import defaultImage from '../assets/astley.png'
import "./Main.css"

function Main() {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = defaultImage;
    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 6);
      setPalette(colors);
      setImageUrl(img.src);
    }
  }, []);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img, 6);
        setPalette(colors);
        setImageUrl(img.src);
      }
    }

    setImage(file);
  }

  const handleOppositeColors = () => {
    const newPalette = palette.map(color => {
      return [255 - color[0], 255 - color[1], 255 - color[2]];
    });
    setPalette(newPalette);
  }

  const handleSelectFile = () => {
    fileInput.current.click();
  }

  return (
    <div className='container'>
        <h1 className='header'>Palette Hive</h1>
      {imageUrl && <img src={imageUrl} alt="Imagem" className="img" />}
      <div className="palette-container">
        {palette.map((color, index) => (
          <div key={index} className="color" style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}>
            <p className="color-text">{`#${color[0].toString(16)}${color[1].toString(16)}${color[2].toString(16)}`}</p>
          </div>
        ))}
      </div>
      <div className="buttons">
        <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInput} style={{ display: 'none' }} />
        <button onClick={handleSelectFile} className='btn'>Select Image</button>
      </div>
    </div>
  );
}

export default Main;
