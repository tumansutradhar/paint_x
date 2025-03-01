import React from "react";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <p className="absolute bottom-0 left-0 w-full text-zinc-600 text-center text-[10px] sm:text-[15px] pb-2">
            Copyright © {year}{" "}
            <a href="https://github.com/tumansutradhar" target="_blank" rel="noopener noreferrer" title="Visit my GitHub" className="hover:text-white hover:underline transition duration-200">
                Tuman Sutradhar
            </a>, PaintX. All rights reserved.
        </p>
    );
}

export default Footer;
