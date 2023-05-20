
const CopyRight = () => {
    return (
        <div className='mx-auto max-w-8xl'>
            <div className='mx-4'>
                <div className='py-8 text-center text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Copyright © 2023 Huỳnh Huy Hoàng
                    <ul className='flex gap-2 justify-center items-center mt-5'>
                        <li>
                            <a href="https://tailwindcss.com/">
                                <svg
                                    width="32px"
                                    height="32px"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>TailwindCSS</title>
                                    <path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" className='fill-cyan-500 dark:fill-cyan-400'></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://react.dev/">
                                <svg
                                    width="32px"
                                    height="32px"
                                    viewBox="-10.5 -9.45 21 18.9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="0" cy="0" r="2" fill="#149eca"></circle><g stroke="#149eca" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CopyRight
