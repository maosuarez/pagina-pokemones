function BtnTipos({ type, texto }: { type: string; texto: string }) {
  const classText = `type-pokemon type-${type} cursor-pointer transition-transform transform hover:scale-110 hover:shadow-md hover:bg-opacity-90`;

  return <span className={classText}>{texto}</span>;
}

export default BtnTipos;
