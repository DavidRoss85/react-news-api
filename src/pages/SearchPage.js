import { useParams } from "react-router-dom";
import { fetchSearchResults } from "../app/selectors/newsSlice";
import { useEffect} from "react";
import { useSelector } from "react-redux";

const SearchPage = () =>{
    const { searchCriteria } = useParams();
    const searchResults = useSelector((state)=>state.news.searchResults.news)

    // useEffect(()=>{
    //     fetchSearchResults({keyword: searchCriteria})
    // },[])
    useEffect(()=>{
        console.log('Results change')
        console.log('Results:', searchResults)
    },[searchResults])

    return(
        <>
            
            {searchResults.articles.map((result,idx)=>{
                return (
                    <div key={idx}>
                        <div>Title: {result.title}</div>
                        <div>{searchCriteria}</div>
                    </div>
                    
                    )
            })}
        </>
    )
}

export default SearchPage;