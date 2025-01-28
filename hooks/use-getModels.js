import { useGetModelsQuery } from "@/store/apiServices/apiServices";
function useGetModels(brandId){
    const {data} = useGetModelsQuery(1);
    return data;
}
export default useGetModels;