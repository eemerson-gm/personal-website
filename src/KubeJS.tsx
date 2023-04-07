/* eslint-disable jsx-a11y/anchor-is-valid */
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

interface Progress {
  current: number;
  maximum: number;
}

const asyncEach = <T,>(
  array: T[],
  onEntry: (entry: T, index: number) => void,
  onProgress: (index: number) => void,
  onFinish: () => void,
  chunk = 10,
  index = 0
) => {
  if (array.length <= 0) return;
  if (index >= array.length) {
    onFinish();
    return;
  }
  onEntry(array[index], index);
  if (index % chunk === 0) {
    setTimeout(function () {
      onProgress(index);
      asyncEach(array, onEntry, onProgress, onFinish, chunk, ++index);
    }, 0);
  } else {
    asyncEach(array, onEntry, onProgress, onFinish, chunk, ++index);
  }
};

export default function KubeJSPage() {
  const [progress, setProgress] = useState<Progress>();

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
      const extract = require('extract-string');
      const uniques = [] as string[];
      image.onload = () => {
        asyncEach(
          filteredAtlas,
          (entry, index) => {
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
            const itemType =
              entry.name.indexOf('block') > -1 ? 'block' : 'item';
            const item = extract(entry.name).pattern(`{mod}:${itemType}/{id}`);
            if (!item[0]) return;
            const itemId = item[0].mod + ':' + item[0].id;
            const hasNumber = /\d/.test(itemId);
            if (uniques.includes(itemId)) return;
            if (
              hasNumber &&
              (itemId.endsWith('_0') || itemId.endsWith('_00'))
            ) {
              const newItemId = itemId.substring(0, itemId.length - 2);
              if (uniques.includes(newItemId)) return;
              tempItemList?.push({
                id: newItemId,
                type: 'item',
                dataURL: img,
              });
              uniques.push(newItemId);
            }
            if (!hasNumber) {
              tempItemList?.push({
                id: itemId,
                type: 'item',
                dataURL: img,
              });
              uniques.push(itemId);
            }
            context?.clearRect(0, 0, entry.width, entry.height);
          },
          (index) => {
            setProgress({
              current: index,
              maximum: filteredAtlas.length,
            });
          },
          () => {
            setItemList(tempItemList);
          }
        );
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
      <div
        style={{
          textAlign: 'center',
          display: progress && !itemList ? 'block' : 'none',
        }}
      >
        <a aria-busy='true'>
          Loading assets, please wait… {progress?.current}/{progress?.maximum}
        </a>
      </div>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {itemList?.map((item) => (
          <button
            data-tooltip={item.id}
            style={{
              margin: '4px',
              padding: '0px',
              width: '48px',
              float: 'left',
            }}
          >
            <img
              key={item.id}
              alt={item.id}
              src={item.dataURL}
              width='48px'
              height='48px'
              style={{
                imageRendering: 'pixelated',
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
