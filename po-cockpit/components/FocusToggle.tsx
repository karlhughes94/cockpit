type Props = {
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
};

export default function FocusToggle({ focusMode, setFocusMode }: Props) {
  return (
    <button
      onClick={() => setFocusMode(!focusMode)}
      className="btn-secondary"
    >
      Focus Mode: {focusMode ? "ON" : "OFF"}
    </button>
  );
}