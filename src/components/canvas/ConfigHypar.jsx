export function ConfigHypar (
  segments, handleSegments, 
  vertexX, handleX, 
  vertexY, handleY, 
  vertexZ, handleZ, 
  nMantos, handleNMantos, 
  clipping, handleClipping, 
  clipPlane0, handleCP0, 
  clipPlane1, handleCP1,
  configurable, handleConfigurable,
  currentHypar
) {
  return (
    <section className='absolute flex flex-col p-2 m-2 bg-gray-200 rounded-md shadow-md opacity-75 hover:opacity-100 appearance-none z-[9999] w-[360px]'>
        <h5><strong>{currentHypar}</strong></h5>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex items-center'>
          <label>Modificar&nbsp;</label>
          <input
            id='configurable'
            type='checkbox'
            checked={configurable}
            onChange={handleConfigurable}
            className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
        </div>
        <div className='flex flex-row justify-between items-center'>
          <label>{clipping ? 'Mostrar hypar' : 'Mostrar completo'} &nbsp;</label>
          <input
            id='planocorte0'
            type='checkbox'
            checked={clipping}
            onChange={handleClipping}
            className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
        </div>
      </div>


      <div className={!configurable ? 'opacity-50 pointer-events-none' : ''}>
        <div className='flex flex-row justify-between items-center'>
          <label>Mantos:&nbsp;</label>
          <input
            id='rango-mantos'
            type='range'
            value={nMantos}
            onChange={handleNMantos}
            min='3'
            max='10'
            className='w-[200px] h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{nMantos}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label>Vértice X:&nbsp;</label>
          <input
            id='rango-vertexX'
            type='range'
            value={vertexX}
            onChange={handleX}
            min='3'
            max='50'
            className='w-[200px] h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{vertexX}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label>Vértice Y:&nbsp;</label>
          <input
            id='rango-vertexY'
            type='range'
            value={vertexY}
            onChange={handleY}
            min='3'
            max='50'
            className='w-[200px] h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{vertexY}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label>Vértice Z:&nbsp;</label>
          <input
            id='rango-vertexZ'
            type='range'
            value={vertexZ}
            onChange={handleZ}
            min='3'
            max='50'
            className='w-[200px] h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{vertexZ}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label>Inclinación corte:&nbsp;</label>
          <input
            id='planocorte0'
            type='range'
            value={clipPlane0}
            onChange={handleCP0}
            min='0'
            max='30'
            step='1'
            className='w-auto h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-12 text-right'>{Number(clipPlane0).toFixed(1)}°</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label>Posición corte:&nbsp;</label>
          <input
            id='planocorte1'
            type='range'
            value={clipPlane1}
            onChange={handleCP1}
            min='0'
            max='40'
            step='0.1'
            className='w-auto h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-12 text-right'>{Number(clipPlane1).toFixed(1)}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label>Segmentos:&nbsp;</label>
          <input
            id='segments-range'
            type='range'
            value={segments}
            onChange={handleSegments}
            min='4'
            max='300'
            className='w-auto h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-12 text-right'>{segments}</label>
        </div>
      </div>
    </section>
  )
}
