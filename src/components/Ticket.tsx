export interface Props {
    ticket_amount: string;
    ticket_type: string;
    ticket_description: string;
    ticket_availability: string;
    ticket_quantity: string;
}

export const Ticket = (props:Props) => {
    return (
        <div className="rounded-xl shadow border border-gray-200 flex-col justify-between items-start inline-flex w-[286px] h-[278px] bg-white">
            <div>
                <h4 className="px-3 py-2">{props.ticket_amount}</h4>
                <h5 className="px-3">{props.ticket_type}</h5>
                <p className="px-3">{props.ticket_description}</p>
                {/* <p className="px-3"></p> */}
            </div>
            <div className="px-3 flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#27AE60" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div></div>
                <p>{props.ticket_availability}</p>
            </div>
        </div>
    )
}