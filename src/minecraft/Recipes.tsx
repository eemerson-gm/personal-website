import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Ingredient {
  id: string;
  Count: string;
  Slot: string;
  tag?: any;
}

const Recipes = () => {
  const [amount, setAmount] = useState<number>(1);
  const [crafting, setCrafting] = useState<string>('');
  const [shapedCode, setShapedCode] = useState<string>('');
  const [shapelessCode, setShapelessCode] = useState<string>('');
  const [isErrored, setIsErrored] = useState<boolean>(true);

  const parseCrafting = useCallback(() => {
    const recipeRaw = crafting.substring(crafting.indexOf('{'));
    let recipeJSON = recipeRaw;
    for (let n = 0; n < 10; n++) {
      recipeJSON = recipeJSON.replaceAll(`${n}b`, `"${n}"`);
    }
    const patternKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    // eslint-disable-next-line no-eval
    const recipeItems = eval(recipeJSON) as Ingredient[];
    const recipeUniques = recipeItems
      .filter(
        (item, index, array) =>
          array.findIndex((i) => i.id === item.id) === index
      )
      .map((item) => item.id);
    let patternArray = [];
    for (let h = 0; h < 3; h++) {
      let patternStr = '';
      for (let w = 0; w < 3; w++) {
        const index = h * 3 + w;
        const item = recipeItems.find((item) => Number(item.Slot) === index);
        patternStr += item ? patternKeys[recipeUniques.indexOf(item.id)] : ' ';
      }
      patternArray.push(patternStr);
    }
    setShapedCode(
      `replaceShaped(${amount}, "??????????", [${patternArray.map(
        (p) => `"${p}"`
      )}],{
        ${recipeUniques.map((id, index) => `${patternKeys[index]}: "${id}"`)}
      })`
    );
    setShapelessCode(
      `replaceShapeless(${amount}, "??????????", [${recipeItems.map(
        (item) => `"${item.id}"`
      )}])`
    );
  }, [amount, crafting]);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (isErrored) {
        toast.error('Error: Failed to create recipe', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }
      navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    },
    [isErrored]
  );

  useEffect(() => {
    if (crafting) {
      try {
        parseCrafting();
        setIsErrored(false);
      } catch (error: any) {
        toast.error(`Error: ${error.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setIsErrored(true);
      }
    }
  }, [crafting, parseCrafting]);

  return (
    <article>
      <header>
        <hgroup style={{ margin: 0 }}>
          <h2>Recipe to Clipboard</h2>
          <h3>
            Create custom recipes copied from your in-game crafting table.
          </h3>
        </hgroup>
      </header>
      <label>Amount:</label>
      <input
        type='textbox'
        defaultValue={amount}
        onBlur={(e) => {
          let tempAmount = Number(e.target.value);
          tempAmount = Math.min(64, tempAmount);
          tempAmount = Math.max(1, tempAmount);
          setAmount(tempAmount);
          e.target.value = tempAmount.toString();
        }}
      ></input>
      <label>Recipe Data:</label>
      <textarea
        style={{ resize: 'vertical' }}
        placeholder='Paste your data here...'
        value={crafting}
        onChange={(e) => setCrafting(e.target.value)}
      ></textarea>
      <div className='grid'>
        <button onClick={() => copyToClipboard(shapedCode)}>Copy Shaped</button>
        <button onClick={() => copyToClipboard(shapelessCode)}>
          Copy Shapeless
        </button>
      </div>
      <footer>
        <ol>
          <li>
            Download the{' '}
            <a href='https://www.curseforge.com/minecraft/mc-mods/visual-workbench'>
              Visual Workbench
            </a>{' '}
            mod from CurseForge
          </li>
          <li>Layout your recipe in the workbench.</li>
          <li>
            Look at your workbench and press <b>F3 + i</b> to copy contents.
          </li>
          <li>
            Paste the copied data and press the button to copy your{' '}
            <a href='https://www.curseforge.com/minecraft/mc-mods/kubejs'>
              KubeJS
            </a>{' '}
            custom recipe.
          </li>
        </ol>
      </footer>
    </article>
  );
};

export { Recipes };
