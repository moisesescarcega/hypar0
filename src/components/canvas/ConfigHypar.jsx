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
  showSurface, handleShowSurface,
  currentHypar
) {
  return (
    <section className='absolute flex flex-col space-y-2 p-2 m-2 bg-gray-200 rounded-md shadow-md opacity-75 hover:opacity-100 appearance-none z-[9999] w-[360px]'>
      <h5 className="w-full my-0 py-0"><strong>{currentHypar}</strong></h5>
      {/* <div className='flex flex-row justify-between items-center'>
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
      </div> */}

      <div className="flex flex-row w-auto space-x-2">
        <button 
          className="rounded-md border border-slate-300 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:border-slate-800 active:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full" 
          type="button"
          onClick={handleConfigurable}
        >{configurable ? 'Mostrar variantes' : 'Modificar'}</button>
        <button 
          className="rounded-md border border-slate-300 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:border-slate-800 active:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full" 
          type="button"
          onClick={handleShowSurface}
        >{showSurface ? 'Superficie reglada' : 'Superficie sólida'}</button>
      </div>

      <div className={!configurable ? 'opacity-50 pointer-events-none' : ''}>
        <div className='flex flex-row justify-between items-center'>
          <label className="w-[100px]">Mantos:&nbsp;</label>
          <input
            id='rango-mantos'
            type='range'
            value={nMantos}
            onChange={handleNMantos}
            min='3'
            max='10'
            className='w-full h-2 mx-3 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{nMantos}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label className="w-[100px]">Vértice X:&nbsp;</label>
          <input
            id='rango-vertexX'
            type='range'
            value={vertexX}
            onChange={handleX}
            min='3'
            max='50'
            className='w-full h-2 mx-3 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{vertexX}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label className="w-[100px]">Vértice Y:&nbsp;</label>
          <input
            id='rango-vertexY'
            type='range'
            value={vertexY}
            onChange={handleY}
            min='3'
            max='50'
            className='w-full h-2 mx-3 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{vertexY}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <label className="w-[100px]">Vértice Z:&nbsp;</label>
          <input
            id='rango-vertexZ'
            type='range'
            value={vertexZ}
            onChange={handleZ}
            min='3'
            max='50'
            className='w-full h-2 mx-3 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-8 text-right'>{vertexZ}</label>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row justify-between items-center'>
            <label className="w-[100px]">Plano de corte:&nbsp;</label>
            <input
              id='planocorte1'
              type='range'
              value={clipPlane1}
              onChange={handleCP1}
              min='0'
              max='40'
              step='0.1'
              className='w-[80px] h-2 mx-1 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
            />
            <label className='w-8 text-left'>{Number(clipPlane1).toFixed(1)}</label>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <input
              id='planocorte0'
              type='range'
              value={clipPlane0}
              onChange={handleCP0}
              min='0'
              max='30'
              step='1'
              className='w-[80px] h-2 mx-1 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
            />
            <label className='w-10 text-left'>{Number(clipPlane0).toFixed(1)}°</label>
          </div>
        </div>

        <div className={configurable && !showSurface ? 'flex flex-row justify-between items-center' : 'flex flex-row h-0 invisible'}>
          <label>Segmentos:&nbsp;</label>
          <input
            id='segments-range'
            type='range'
            value={segments}
            onChange={handleSegments}
            min='4'
            max='300'
            className='w-full h-2 mx-3 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
          <label className='w-10 text-right'>{segments}</label>
        </div>
      </div>
    </section>
  )
}
