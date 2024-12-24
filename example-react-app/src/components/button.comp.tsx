interface IProps {
  text: string;
  onTap: () => void;
}

const CustomButtonComp = ({ text, onTap }: IProps) => {
  return (
    <button
      onClick={onTap}
      className="bg-blue-700 rounded-lg p-5 flex justify-center items-center"
    >
      <p className="font-semibold text-lg">{text}</p>
    </button>
  );
};

export default CustomButtonComp;
