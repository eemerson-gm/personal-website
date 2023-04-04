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
            <strong>Modded Minecraft Helper</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a href='/kubejs' role='button'>
              KubeJS
            </a>
          </li>
          <li>
            <a href='/loadtime' role='button'>
              Load-Time
            </a>
          </li>
          <li>
            <a href='#' role='button'>
              Button
            </a>
          </li>
        </ul>
      </nav>
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
}
