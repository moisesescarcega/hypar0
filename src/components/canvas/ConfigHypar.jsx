export function ConfigHypar (segments, handleSegments, vertexX, handleX, vertexY, handleY, vertexZ, handleZ, clipping, handleClipping, clipPlane0, handleCP0, clipPlane1, handleCP1) {
  return (
    <section className='absolute flex flex-col p-2 m-2 bg-gray-200 rounded-md shadow-md opacity-75 hover:opacity-100 appearance-none z-[9999]'>
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

      {/* <div className='flex-row'>
        <label>Planos de corte:&nbsp;</label>
        <input
          id='planocorte0'
          type='checkbox'
          value={true}
          onChange={handleClipping}
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
      </div> */}

      <div className='flex-row'>
        <label>Plano sesgado:&nbsp;</label>
        <input
          id='planocorte0'
          type='range'
          value={clipPlane0}
          onChange={handleCP0}
          min='15'
          max='90'
          step='15'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{clipPlane0}</label>
      </div>

      <div className='flex-row'>
        <label>Plano vertical:&nbsp;</label>
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
          max='200'
          className='h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
        />
        <label>{segments}</label>
      </div>
    </section>
  )
}
