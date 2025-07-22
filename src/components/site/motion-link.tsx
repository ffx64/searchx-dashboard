'use client';

import { Link } from "react-scroll";

type Props = {
    href: string;
    label: string;
};

export const MotionLink = ({ href, label }: Props) => {

    return (
        <Link 
            to={href} 
            offset={-85} 
            smooth={true} 
            duration={500}
            className="transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100 cursor-pointer"
        >
            {label}
        </Link>
    );
};
