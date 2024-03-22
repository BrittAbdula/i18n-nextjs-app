'use client';

import { useSearchParams, useParams, useRouter, usePathname } from "next/navigation";

const CategoryButton = ({ params }: { params: string }) => {
    const pathName = usePathname();
    const { category } = useParams();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if(term){
            params.set('category', term);
        }else{
            params.delete('category');
        }
        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <button className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold" onClick={ () => handleSearch(params) }>
            {params}
        </button>
    )
}

export default CategoryButton;