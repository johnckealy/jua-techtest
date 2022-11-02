import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

function HomePage({ }) {
  const [fileData, setFileData] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const BaseMap = dynamic(() => import('@/components/BaseMap'), {
    ssr: false,
  })

  const showFile = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = (e.target.result)
      try {
        text = JSON.parse(text)
        setFileData(text)
      }
      catch (e) {
        console.log(e)
        setUploadError('There was a problem uploading your file. Please check that the file of type .geojson')
      }
    };
    reader.readAsText(e.target.files[0])
  }

  const restart = () => {
    setFileData(null)
  }


  return (
    <div className='m-5 max-w-[80vw] mx-auto '>
      <h1 className=''>Jua Tech Test</h1>
      <span className='italic'>John Kealy, November 2022</span>

      <section>
        <h3>Usage</h3>
        {!fileData && <p>This is a simple polygon generator for use with GeoJSON files.
          To get started, click on the upload button to add a geojson file.
          Once loaded, a map should appear with the polygons displayed.
        </p>}
        {fileData && <p>
          You may edit any polygon on the map. To do so, simply click the desired
          feature; it should display in a different colour. Then, click the "Edit Layers"
          button on the top right hand side of the map. You may now drag any of the
          geopoints to a new location and reshape the feature. Click "Save" when you're done.
        </p>}
        {fileData && <p> You may also add new polygons anywhere on the map by clicking the "Draw a polygon"
          Button. This will save automatically, but you can always remove it using the "Delete Layers"
          button.
        </p>}
        {fileData && <p> When you're done, hit the "Get GeoJSON" button to download the new feature set.
        </p>}
      </section>

      {fileData && <div>
        <button className='mr-auto py-2 px-6 ring-1 ring-gray-400 shadow-lg hover:bg-gray-100  gap-2 rounded-full  m-3 flex items-center' onClick={restart}>
          <FiRefreshCw /><span>Restart</span>
        </button>
      </div>}

      {!fileData && <div className='grid border-2 border-black rounded-lg grid-cols-1 h-64 place-items-center '>
        <div className='flex flex-col gap-4'>
          <h3>Please upload a GeoJSON file</h3>
          <span className='text-red-600'>{uploadError}</span>
          <input type="file" onChange={showFile} className=' file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-blue-100
            hover:file:text-amber-700'/>
        </div>
      </div>}


      {fileData && <BaseMap fileData={fileData} />}

      <div className='pb-32' />
    </div>
  )
}


export default HomePage
