import { Button } from "flowbite-react";

const ScrambleSelector = ({ scrambles, scramble, setScramble }) => {
  return (
    <Button.Group className="flex-wrap">
      {scrambles.map(({ title }) => {
        const active = scramble == title;
        return (
          <Button
          key={title}
            color={ active?undefined:"gray"}
            selected={scramble == title}
            onClick={() => setScramble(title)}
          >
            {title}
          </Button>
        );
      })}
    </Button.Group>
  );
};

export default ScrambleSelector;
