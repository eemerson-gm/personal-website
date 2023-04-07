import { forEachOf } from 'async';
import React, { MouseEvent, useEffect, useState } from 'react';

interface ItemEntry {
  id: string;
  type: 'item' | 'block';
  dataURL: string;
}

interface DataEntry {
  name: string;
  animated: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function KubeJSPage() {
  const [imageFile, setImageFile] = useState<File>();
  const [atlasFile, setAtlasFile] = useState<File>();

  const [blocks, setBlocks] = useState<string>();
  const [atlas, setAtlas] = useState<DataEntry[]>();

  const [itemList, setItemList] = useState<ItemEntry[]>();

  const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (imageFile && atlasFile) {
      const imageReader = new FileReader();
      const atlasReader = new FileReader();
      imageReader.onload = (e) => {
        const data = e.target?.result as string;
        setBlocks(data);
      };
      atlasReader.onload = (e) => {
        const data = e.target?.result as string;
        const cleanData = data.substring(data.indexOf('['), data.length);
        setAtlas(JSON.parse(cleanData));
      };
      imageReader.readAsDataURL(imageFile);
      atlasReader.readAsText(atlasFile);
    }
  };

  const cropImage = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    width: number,
    height: number
  ): string => {
    context?.drawImage(image, x, y, width, height, 0, 0, width, height);
    context?.save();
    return canvas.toDataURL();
  };

  useEffect(() => {
    if (atlas && blocks && !itemList) {
      let tempItemList = [] as ItemEntry[];
      const filteredAtlas = atlas
        .filter((entry) => {
          return (
            entry.name.indexOf('item') >= 0 &&
            entry.width + entry.height === 32 &&
            entry.animated === false
          );
        })
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      const image = new Image();
      const canvas = document.createElement('canvas');
      const context = canvas?.getContext('2d');
      image.onload = () => {
        forEachOf(filteredAtlas.entries(), ([index, entry]) => {
          canvas.width = entry.width;
          canvas.height = entry.height;
          const img = cropImage(
            image,
            canvas,
            context,
            entry.x,
            entry.y,
            entry.width,
            entry.height
          );
          tempItemList?.push({
            id: entry.name,
            type: 'item',
            dataURL: img,
          });
          context?.clearRect(0, 0, entry.width, entry.height);
        });
        setItemList(tempItemList);
        console.log('Complete!');
      };
      image.src = blocks;
    }
  }, [atlas, blocks, itemList]);

  return (
    <>
      <article>
        <header>KubeJS Editor</header>
        <label htmlFor='image'>Upload Image:</label>
        <input
          id='image'
          type='file'
          onChange={(e) => {
            if (e.target.files) setImageFile(e.target.files[0]);
          }}
        />
        <label htmlFor='image'>Upload Atlas:</label>
        <input
          id='atlas'
          type='file'
          onChange={(e) => {
            if (e.target.files) setAtlasFile(e.target.files[0]);
          }}
        />
        <button onClick={onSubmit}>Submit</button>
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
      {itemList?.map((item) => (
        <img
          key={item.id}
          alt={item.id}
          src={item.dataURL}
          width='48px'
          height='48px'
          style={{
            margin: '4px',
            padding: '2px',
            backgroundColor: 'var(--card-sectionning-background-color)',
            imageRendering: 'pixelated',
          }}
        />
      ))}
    </>
  );
}
