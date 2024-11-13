type Props = {
  icon?: React.ReactNode;
  text: string;
};

export function Toast({ icon, text }: Props) {
  return (
    <div className="flex items-center gap-2">
      {icon && icon}
      <span className="text-lg">{text}</span>
    </div>
  );
}
