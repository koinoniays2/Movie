import React from 'react'
import { Link } from 'react-router-dom'
import LogoImg from '../assets/LogoImg.png'

export default function Footer() {
    return (
        <div className="w-full bg-[#FCD985] flex justify-center py-10 flex-wrap">
            {/* 1 */}
            <div className="w-[200px] flex flex-col justify-center">
                <Link to={"/"}><img className="h-[30px] object-cover" src={ LogoImg } alt="main Logo" />
                </Link>
            </div>
            {/* 2 */}
            <div className="w-[170px] flex flex-col text-[#823F12]">
                <h3 className="font-bold uppercase">the basic</h3>
                <p>About CINEMA</p>
                <p>Contact us</p>
                <p>Support ForumsAPI</p>
                <p>System Status</p>
            </div>
            {/* 3 */}
            <div className="w-[170px] flex flex-col text-[#823F12]">
                <h3 className="font-bold uppercase">get involved</h3>
                <p>Contribution Guidelines</p>
                <p>Add new movies</p>
                <p>Add new TV shows</p>
            </div>
            {/* 4 */}
            <div className="w-[170px] flex flex-col text-[#823F12]">
                <h3 className="font-bold uppercase">community</h3>
                <p>Guideline</p>
                <p>Discussion History</p>
                <p>Contribution Ranking</p>
            </div>
            {/* 5 */}
            <div className="w-[170px] flex flex-col text-[#823F12]">
                <h3 className="font-bold uppercase">legal</h3>
                <p>Terms of Service</p>
                <p>API Terms of Use</p>
                <p>Privacy Terms</p>
                <p>DMCA Policy</p>
            </div>
        </div>
    )
}