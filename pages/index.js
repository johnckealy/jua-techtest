import dynamic from 'next/dynamic'


function HomePage({ }) {

  const BaseMap = dynamic(() => import('@/components/BaseMap'), {
    ssr: false,
  })


  return (
    <>
      <div className='m-5 max-w-[80vw] mx-auto'>

        <h1 className=''>Jua Tech Test</h1>
        <span className='italic'>John Kealy, November 2022</span>

        <h2 className=''>Wind Particles Animation</h2>
        <div className='border-2 border-black rounded '>
          <BaseMap />
        </div>
      </div>
    </>
  )
}


export default HomePage
