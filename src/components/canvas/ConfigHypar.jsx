export function ConfigHypar (segments, handleSegments, vertexX, handleX, vertexY, handleY, vertexZ, handleZ, nMantos, handleNMantos, clipping, handleClipping, clipPlane0, handleCP0, clipPlane1, handleCP1) {
  return (
    <section className='absolute flex flex-col p-2 m-2 bg-gray-200 rounded-md shadow-md opacity-75 hover:opacity-100 appearance-none z-[9999]'>
      <div className='flex-row'>
        <label>Mantos:&nbsp;</label>
        <input
          id='rango-mantos'
          type='range'
          value={nMantos}
          onChange={handleNMantos}
          min='3'
          max='10'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{nMantos}</label>
      </div>

      <div className='flex-row'>
        <label>Vértice X:&nbsp;</label>
        <input
          id='rango-vertexX'
          type='range'
          value={vertexX}
          onChange={handleX}
          min='3'
          max='50'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{vertexX}</label>
      </div>

      <div className='flex-row'>
        <label>Vértice Y:&nbsp;</label>
        <input
          id='rango-vertexY'
          type='range'
          value={vertexY}
          onChange={handleY}
          min='3'
          max='50'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{vertexY}</label>
      </div>

      <div className='flex-row'>
        <label>Vértice Z:&nbsp;</label>
        <input
          id='rango-vertexZ'
          type='range'
          value={vertexZ}
          onChange={handleZ}
          min='3'
          max='50'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{vertexZ}</label>
      </div>

      <div className='flex-row'>
        <label>Mostrar hypar completo:&nbsp;</label>
        <input
          id='planocorte0'
          type='checkbox'
          checked={clipping}
          onChange={handleClipping}
          className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
      </div>

      <div className='flex-row'>
        <label>Inclinación corte:&nbsp;</label>
        <input
          id='planocorte0'
          type='range'
          value={clipPlane0}
          onChange={handleCP0}
          min='0'
          max='30'
          step='1'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{clipPlane0}°</label>
      </div>

      <div className='flex-row'>
        <label>Posición corte:&nbsp;</label>
        <input
          id='planocorte1'
          type='range'
          value={clipPlane1}
          onChange={handleCP1}
          min='0'
          max='40'
          step='0.1'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{clipPlane1}</label>
      </div>

      <div className='flex-row'>
        <label>Segmentos:&nbsp;</label>
        <input
          id='segments-range'
          type='range'
          value={segments}
          onChange={handleSegments}
          min='3'
          max='150'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{segments}</label>
      </div>
    </section>
  )
}
