import dynamic from 'next/dynamic'


function HomePage({ }) {

  const Contours = dynamic(() => import('@/components/Contours'), {
    ssr: false,
  })

  const WindAnimation = dynamic(() => import('@/components/WindAnimation'), {
    ssr: false,
  })

  return (
    <>
      <div className='m-5 max-w-[80vw] mx-auto'>

        <h1 className=''>Jua Tech Test</h1>
        <span className='italic'>John Kealy, November 2022</span>

        <h2 className=''>Temperature contours</h2>
        <div className=' border-2 border-black rounded'>
          <Contours />
        </div>

        <h2 className=''>Wind Particles Animation</h2>
        <div className='border-2 border-black rounded '>
          <WindAnimation />
        </div>
      </div>
    </>
  )


}


export default HomePage
