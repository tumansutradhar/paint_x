import React from 'react'

function Footer() {
    const year = new Date().getFullYear();

    return (
        <p className='footer absolute bottom-1 text-zinc-600 text-center text-[10px] sm:text-[15px]'>Copyright &copy; {year} Tuman Sutradhar, PaintX. All rights reserved.</p>
    )
}

export default Footer
