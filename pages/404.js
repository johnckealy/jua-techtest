import Link from 'next/link'

export default function FourOhFour() {
  return <>
    <div className='grid place-items-center h-screen'>
      <div className='flex flex-col justify-center'>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <a className='hover:bg-gray-400 hover:text-white m-10 w-fit mx-auto border-2 rounded-full p-5'>
            Go back home
          </a>
        </Link>
      </div>
    </div>
  </>
}
