import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const inputType = visible ? "text" : "password";
  const icon = visible ? (
    <BsFillEyeFill
      onClick={() => setVisible(!visible)}
      className="text-neutral"
    />
  ) : (
    <BsFillEyeSlashFill
      onClick={() => setVisible(!visible)}
      className="text-neutral"
    />
  );

  return [inputType, icon];
};

export default usePasswordToggle;
