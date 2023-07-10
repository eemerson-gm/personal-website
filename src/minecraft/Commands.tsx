import { useState } from 'react';

interface CommandProps {
  onGenerate: (commands: string[]) => void;
}

export default function CommandsPage() {
  const [commandOutput, setCommandOutput] = useState<string>();

  const generateCommandOutput = (commands: string[]) => {
    commands.push(
      'kill @e[type=minecraft:command_block_minecart,distance=..1]'
    );
    let output = `summon minecraft:falling_block ~ ~1 ~ 
    {
      Passengers:[
        ${commands.map(
          (command) =>
            `{id:"minecraft:command_block_minecart",Command:"${command}"}`
        )}
      ],
      BlockState:{Name:activator_rail,powered:true}
    }`;
    output = output
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
    setCommandOutput(output);
  };

  return (
    <>
      <article>
        <header>
          <hgroup style={{ margin: 0 }}>
            <h2>Command Utilities</h2>
            <h3>Various Minecraft command generators.</h3>
          </hgroup>
        </header>
        <textarea
          style={{ resize: 'vertical' }}
          placeholder='Your generated command output...'
          value={commandOutput}
          onChange={(e) => setCommandOutput(e.target.value)}
          readOnly
        ></textarea>
        <CarrotOnAStick onGenerate={generateCommandOutput} />
      </article>
    </>
  );
}

const CarrotOnAStick = ({ onGenerate }: CommandProps) => {
  const [name, setName] = useState<string>();
  const [command, setCommand] = useState<string>();

  const onClick = () => {
    onGenerate([
      `setblock ~ ~1 ~ minecraft:command_block{Command:\\"scoreboard objectives add _carrot_ minecraft.used:minecraft.carrot_on_a_stick\\"}`,
      `setblock ~ ~2 ~ minecraft:repeating_command_block[facing=up]{Command:\\"execute as @a[scores={_carrot_=1..}] run ${command}\\",auto:true}`,
      `setblock ~ ~3 ~ minecraft:chain_command_block[facing=up,conditional=true]{Command:\\"scoreboard players set @a _carrot_ 0\\",auto:true}`,
    ]);
  };

  return (
    <>
      <article>
        <header style={{ marginBottom: 0 }}>
          <h2>Carrot On A Stick</h2>
          <input
            type='text'
            placeholder='Name of stick...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Command on right-click...'
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button onClick={onClick}>Generate</button>
        </header>
      </article>
    </>
  );
};
