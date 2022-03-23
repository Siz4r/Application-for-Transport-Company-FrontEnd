type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FormEvent) => void;
  hasError: boolean;
};

export const ModalInput = (props: Props) => {
  let inputStyleClass = props.hasError
    ? "form-control border-danger"
    : "form-control";

  return (
    <input
      className={inputStyleClass}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onBlur={props.onBlur}
      onChange={props.onChange}
    />
  );
};
