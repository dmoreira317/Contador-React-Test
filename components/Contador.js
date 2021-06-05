const Contador = () => {
  // cuando cambia el estado de alguna variable, se renderiza todo el componente nuevamnete
  const [contador, setContador] = React.useState(0);
  const aumentar = () => setContador(contador + 1);
  const disminuir = () => setContador(contador - 1);
  //console.log(contador);
  //cuando paso las funciones en forma de const adentro de onClick, por ejemplo, se pasa sin ().
  // para pasar las clases de css, y no mezclar con las class de JS, se usa className
  return (
    <div>
      <h1 className={contador < 0 ? "menor" : "mayor"}>Contador: {contador}</h1>
      <hr />
      <button onClick={aumentar}>Aumentar</button>
      <button onClick={disminuir}>Disminuir</button>
    </div>
  );
};
