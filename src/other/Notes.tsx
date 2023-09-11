import { useEffect, useState } from 'react';

const storageNotes = localStorage.getItem('notes')?.split(',') || [''];

const Notes = () => {
  const [notes, setNotes] = useState<string[]>(storageNotes);

  useEffect(() => {
    localStorage.setItem('notes', notes.toString());
  }, [notes]);

  return (
    <>
      <article>
        <header>
          <hgroup style={{ margin: 0 }}>
            <h2>Notes</h2>
            <h3>Write some notes to keep track of here.</h3>
          </hgroup>
        </header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {notes.map((note, index) => (
            <>
              <div>
                <textarea
                  key={index}
                  style={{
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                    width: '14rem',
                    height: '12rem',
                    overflow: 'auto',
                    resize: 'vertical',
                  }}
                  onChange={(event) => {
                    let newNotes = [...notes];
                    newNotes[index] = event.target.value;
                    setNotes(newNotes);
                  }}
                  value={note}
                >
                  <div>Hello</div>
                </textarea>
              </div>
            </>
          ))}
        </div>
        <div
          role='button'
          style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
          onClick={() => {
            setNotes((prev) => [...prev, '']);
          }}
        >
          Add Note
        </div>
        <div
          role='button'
          style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
          onClick={() => {
            setNotes(['']);
          }}
        >
          Clear Notes
        </div>
      </article>
    </>
  );
};

export { Notes };
