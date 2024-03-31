'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


const Search = (params: {placeholder: string}) => {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const { placeholder } = params;
    
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if(term){
            params.set('query', term);
        }else{
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    return (
        <input type="text" className="mb-10 block h-9 min-h-[44px] w-full rounded-md border border-solid border-[#cccccc] bg-[#f2f2f7] bg-[16px_center] bg-no-repeat py-3 pl-11 pr-4 text-sm font-bold text-[#333333] [background-size:18px] [border-bottom:1px_solid_rgb(215,_215,_221)]" 
        placeholder={placeholder}
        onChange={ (e) => handleSearch( e.target.value )}
        defaultValue={searchParams.get('query')?.toString()}/>
    )
}

export default Search;