import { ButtonProp } from "types";

function Button({ children, disabled }: ButtonProp) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mb-6 rounded-[0.375rem] bg-red p-4 font-outfit text-[0.9375rem] font-normal text-white transition-all delay-75 hover:bg-white hover:text-semiDarkBlue disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red disabled:hover:text-white"
    >
      {children}
    </button>
  );
}

export default Button;
