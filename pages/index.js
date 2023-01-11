import Head from 'next/head';
import Image from 'next/image';
import spellbookLogo from '../assets/spellbook-logo.png';
import { useState } from 'react';


const Home = () => {
  const [titleInput, setTitleInput] = useState('');
  const [characterInput, setCharacterInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titleInput, characterInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onTitleChangedText = (event) => {
    setTitleInput(event.target.value);
  };

  const onCharacterChangedText = (event) => {
    setCharacterInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Spellbook</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Summon a custom D&D Campaign</h1>
          </div>
          <div className="header-subtitle">
            <h2>Give Spellbook a few details, and watch it summon your next campaign. Use the following format to generate your campaign. 
              <br/>
              <br/>Spellbook will break up your new adventure into 5 easily digestible quest lines, each intended for its own session. Good luck!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            className="prompt-box" 
            placeholder="Your Campaign Title:"
            value={titleInput}
            onChange={onTitleChangedText}
          />;
          <textarea 
            className="prompt-box" 
            placeholder="Main Character Names:"
            value={characterInput}
            onChange={onCharacterChangedText}
          />;
          <div className="prompt-buttons">
            <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.youtube.com/watch?v=Vr2YdvKo6sI"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={spellbookLogo} alt="spellbook logo" />
            <p>Spellbook</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
