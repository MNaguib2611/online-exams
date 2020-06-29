import React from 'react';

const Notes = () => {
  const initialHeight = 60;

  const resize = () => {
    const textarea = document.getElementById('notes');

    textarea.style.height = `${initialHeight}px`;
    const height = textarea.scrollHeight;
    textarea.style.height = `${height + initialHeight}px`;
    textarea.addEventListener('input', resize);
  };

  const handleKeyPress = (event) => {
    resize();
  };
  return (
    <div>
      <h2 className='notes-title'>Notes</h2>
      <small>notes will not be submitted</small>
      <textarea id='notes' onKeyPress={handleKeyPress}></textarea>
    </div>
  );
};

export default Notes;
