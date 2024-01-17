import { SignIn } from '@clerk/clerk-react'
import brandImage from '../assets/brandImg.png'
import { dark } from '@clerk/themes'
const Login = () => {
  return (
    <>
      <div className='bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r min-h-screen flex flex-col items-center justify-evenly '>
        <div className='flex gap-2'>
          <h1 className='font-poppins font-bold text-5xl text-center top-20 bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-sky-500 to-sky-500 text-transparent inline-block bg-clip-text drop-shadow-lg'>
            Invoicer
          </h1>
          <img className='w-12 drop-shadow-md' src={brandImage} alt='brand' />
        </div>
        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              formButtonPrimary: 'bg-red-500',
            },
          }}
        />
      </div>
    </>
  )
}
export default Login
