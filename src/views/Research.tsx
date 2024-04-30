import { Research as R } from "../db";

export default function Research() {
  return (
    <div className="grid grid-cols-4">
      {R.map(([idx, { task, category, goal }]) => (
        <>
          <div>{task}</div>
          <div>{goal}</div>
          <div>Pokemon #{idx}</div>
          <div>{category}</div>
        </>
      ))}
    </div>
  );
}
