const Home = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img alt='mushroom man' src='/images/home.png' width={96} />
        <hgroup style={{ textAlign: 'center' }}>
          <h2>Welcome to Kupoapo</h2>
          <h3>Here you will find various web ideas and experimental things.</h3>
        </hgroup>
      </div>
    </>
  );
};

export { Home };
