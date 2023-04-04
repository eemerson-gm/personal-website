export default function KubeJSPage() {
  const onUpload = () => {};

  return (
    <>
      <article>
        <header>KubeJS Editor</header>
        <label htmlFor='image'>Upload Image:</label>
        <input id='image' type='file' onChange={onUpload} />
        <label htmlFor='image'>Upload Atlas:</label>
        <input id='atlas' type='file' onChange={onUpload} />
        <footer>
          <ol>
            <li>
              Download the{' '}
              <a href='https://www.curseforge.com/minecraft/mc-mods/texture-dump/files/all'>
                Texture Dump
              </a>{' '}
              mod from CurseForge
            </li>
            <li>Launch your minecraft modpack with the mod installed</li>
            <li>
              Upload the image:{' '}
              <b>
                /texture_dump/textures/minecraft_textures_atlas_blocks.png_mipmap_0.png
              </b>{' '}
              file
            </li>
            <li>
              Upload the atlas:{' '}
              <b>
                /texture_dump/textureInfo/minecraft_textures_atlas_blocks.png_mipmap_0.js
              </b>{' '}
              file
            </li>
          </ol>
        </footer>
      </article>
    </>
  );
}
