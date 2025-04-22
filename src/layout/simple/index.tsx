type Props = {
  children: React.ReactNode;
};
function SimpleLayout({ children }: Props) {
  return (
    <div>
      <div>this is header</div>
      <div>{children}</div>
    </div>
  );
}

export default SimpleLayout;
