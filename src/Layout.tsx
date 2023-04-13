import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav
        className='container-fluid'
        style={{
          position: 'sticky',
          zIndex: 99,
          top: 0,
          backgroundColor: '#11191f',
          boxShadow: 'rgba(115, 130, 140, 0.2) 0px 1px 0px 0px',
        }}
      >
        <ul>
          <li>
            <img alt='logo' src='/logo.svg' style={{ width: '192px' }} />
          </li>
        </ul>
        <ul>
          <li>
            <details role='list' dir='rtl'>
              <summary aria-haspopup='listbox' role='link'>
                Minecraft
              </summary>
              <ul role='listbox'>
                <li>
                  <a href='/minecraft/kubejs'>KubeJS</a>
                </li>
                <li>
                  <a href='/minecraft/startup'>Startup</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details role='list' dir='rtl'>
              <summary aria-haspopup='listbox' role='link'>
                Japanese
              </summary>
              <ul role='listbox'>
                <li>
                  <a href='/japanese/practice'>Practice</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
}
