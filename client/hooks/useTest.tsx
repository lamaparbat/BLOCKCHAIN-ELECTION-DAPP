import {useRouter} from 'next/router';



export const useTest = () => {
 const router = useRouter();
 
 const goto = (path) => {
   router.push(path)
 }
 
 return {goto}
}
