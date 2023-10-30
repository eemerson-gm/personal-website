import { PreviewCard } from './components/PreviewCard';

const Home = () => {
  return (
    <>
      <div
        style={{
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'row',
          flexFlow: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <PreviewCard
          title='Super Nate Adventure'
          description='A challenging platforming game released for free on Steam.'
          image='/images/covers/super_nate.png'
          link='https://store.steampowered.com/app/1370250/Super_Nate_Adventure/'
        />
        <PreviewCard
          title='Slime Dungeon'
          description='A simple mobile game about shooting slimes and getting coins.'
          image='/images/covers/slime_dungeon.jpg'
          link='https://play.google.com/store/apps/details?id=com.kupoapo.game'
        />
      </div>
    </>
  );
};

export { Home };
