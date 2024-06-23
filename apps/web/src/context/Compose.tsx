export interface ProviderProps {
  children: React.ReactNode;
}

export interface ComposeProps {
  children: React.ReactNode;
  providers: React.FunctionComponent<ProviderProps>[];
}

export function Compose(props: ComposeProps) {
  const { children, providers } = props;

  return (
    <>
      {providers.reduceRight(
        (Child, Parent) => (
          <Parent>{Child}</Parent>
        ),
        children
      )}
    </>
  );
}
