type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export function Toast({ children, icon }: Props) {
  return (
    <div className="flex items-center gap-2">
      {icon && icon}
      <span className="text-lg">{children}</span>
    </div>
  );
}
