function PokemonCard({ img, name, onClick, showRemoveButton, onRemove }) {
  return (
    <div className="bg-white w-[15rem] h-[15rem] p-[3rem] border-2 rounded-[5px] flex flex-col items-center cursor-pointer" onClick={onClick}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      
      {showRemoveButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded shadow hover:bg-orange-700">
          Remove
        </button>
      )}
    </div>
  );
}

export default PokemonCard;