interface PreviewCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <a href={link} style={{ textDecoration: 'none' }}>
      <div
        style={{
          width: '360px',
          height: '520px',
          overflow: 'hidden',
          borderRadius: '1rem',
          backgroundImage: `url('${image}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--card-sectionning-background-color)',
          }}
        >
          <hgroup style={{ textAlign: 'center', margin: 0 }}>
            <h3>{title}</h3>
            <h3>{description}</h3>
          </hgroup>
        </div>
      </div>
    </a>
  );
};

export { PreviewCard };
