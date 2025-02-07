import React from 'react'
// import { GoDotFill } from "react-icons/go";
// import { IoCheckmarkDone } from 'react-icons/io5';
// import { FaWhatsapp } from "react-icons/fa6";

const statusColors = {
    Active: {
        textColor: "text-[#399C16]",
        bgColor: "bg-[#E8FFE8]",
        // icon :   <GoDotFill />,
        text: "Active"

    },

    HighRisk: {
        textColor: "text-[#CB3A3A]",
        bgColor: "bg-[#F3DEDE]",
        // icon :   <GoDotFill />,
        text: "High Risk"


    },

    HighSeverity: {
        textColor: "text-[#CB3A3A]",
        bgColor: "bg-[#F3DEDE]",
        // icon :   <GoDotFill />,
        text: "High Severity"


    },
    Inactive: {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    <GoDotFill />,
        text: "Inactive"


    },

    inactive: {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    <GoDotFill />,
        text: "Inactive"


    },

    Manually: {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    <GoDotFill />,
        text: "Manually"


    },

    Manual: {
        textColor: "text-[#2C2C2C]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    "",
        text: "Manual"
    },

    Notverified: {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    <GoDotFill />,
        text: "Not verified"

    },

    InActive: {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    <GoDotFill />,
        text: "InActive"


    },
    NotSubmitted: {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon :    <GoDotFill />,
        text: "Not Submitted"

    },
    Pending: {
        textColor: "text-[#A5830A]",
        bgColor: "bg-[#FFF09E]",
        // icon :   <GoDotFill />,
        text: "Pending"

    },

    MediumSeverity: {
        textColor: "text-[#A5830A]",
        bgColor: "bg-[#FFF09E]",
        // icon :   <GoDotFill />,
        text: "Medium Severity"

    },

    PreApprover: {
        textColor: "text-[#399C16]",
        bgColor: "bg-[#E8FFE8]",
        // // icon :   <VerifiedIcon />,
        text: "Pre approver"

    },

    Rejected: {
        textColor: "text-[#CB3A3A]",
        bgColor: "bg-[#F3DEDE]",
        // icon :   <GoDotFill />,
        text: "Rejected"

    },
    Approved: {
        textColor: "text-[#3EAF16]",
        bgColor: "bg-[#DEF3DE]",
        // icon :   <GoDotFill />,
        text: "Approved"

    },

    Autoapproval: {
        textColor: "text-[#3EAF16]",
        bgColor: "bg-[#DEF3DE]",
        // icon :   <GoDotFill />,
        text: "Auto approved"

    },
    // Add more status options with their corresponding colors

    Verified: {
        textColor: "text-[#1976D2]",
        bgColor: "bg-[#E5EFFA]",
        // icon : <IoCheckmarkDone className=' mr-2' size={20} color="#1976D2" />,
        text: "Verified"

    },

    Web : {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon : <Globe size={16} className=' mr-1' /> ,
        text: ""
    },

    WhatsApp : {
        textColor: "text-[#727272]",
        bgColor: "bg-[#EAEAEA]",
        // icon : <FaWhatsapp size={16} className=' mr-1' /> ,
        text: ""
    },
    Default : {
        textColor: "text-[#2C2C2C]",
        bgColor: "bg-[#EAEAEA]",
        // icon :  "" ,
        text: "Default"
    },



};


function StatusButton({
    status = 'Active',
    className = "",
    ...props
}) {
    const styles = statusColors[ status] || statusColors.Active; 
    return (
        <span
            className={`${styles.textColor} ${styles.bgColor} font-medium px-[6px] flex justify-center items-center rounded-lg w-20 h-8`} // Added fixed width
            {...props}
        >
            <span className={` ${className}`}>

            {styles.text}
            </span>

        </span>
    )
}

export default StatusButton