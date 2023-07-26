import type {ReactElement, FC} from 'react';


export default function HireBadge(): ReactElement<FC> {
    return (
        <div className="bg-[rgba(229,_229,_229,_0.8)] overflow-hidden rounded-full p-[0.125rem] w-36">
            <div className="inline-block w-2 h-2 overflow-hidden rounded-full bg-green-600 animate-pulse mx-2" />
            <span className="text-neutral-800 text-xs">Available For Hire</span>
        </div>
    );
}