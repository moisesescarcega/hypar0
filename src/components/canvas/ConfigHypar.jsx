export function ConfigHypar(segments, handleSegments, vertexX, handleX, vertexY, handleY, vertexZ, handleZ) {
  return (
    <section className="absolute flex flex-col p-2 m-2 bg-gray-200 rounded-md shadow-md opacity-75 hover:opacity-100 appearance-none z-[9999]">
      <div className="flex-row">
        <label>Vértice X:&nbsp;</label>
        <input 
          id="default-range" 
          type="range" 
          value={vertexX} 
          onChange={handleX} 
          min="3" 
          max="50" 
          className="h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        <label>{vertexX}</label>
      </div>
      <div className="flex-row">
        <label>Vértice Y:&nbsp;</label>
        <input 
          id="default-range" 
          type="range" 
          value={vertexY} 
          onChange={handleY} 
          min="3" 
          max="50" 
          className="h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        <label>{vertexY}</label>
      </div>
      <div className="flex-row">
        <label>Vértice Z:&nbsp;</label>
        <input 
          id="default-range" 
          type="range" 
          value={vertexZ} 
          onChange={handleZ} 
          min="3" 
          max="50" 
          className="h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        <label>{vertexZ}</label>
      </div>
      <div className="flex-row">
        <label>Segmentos:&nbsp;</label>
        <input 
          id="default-range" 
          type="range" 
          value={segments} 
          onChange={handleSegments} 
          min="3" 
          max="200" 
          className="h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        <label>{segments}</label>
      </div>
    </section>
  )
}
