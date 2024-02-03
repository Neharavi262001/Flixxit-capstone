import React, { useEffect, useState } from 'react'
import './explore.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import useFetch from '../../hooks/useFetch'
import { fetchContent,fetchGenres } from '../../utils/tmdb'
import { useNavigate, useParams } from 'react-router-dom'
import Filter from '../../components/Filter/Filter'
import Sort from '../../components/Sort/Sort'
import ResultCard from '../Search/ResultCard/ResultCard'
import { useSelector } from 'react-redux'
import Select from "react-select";
import Card from '../../components/Card/Card'
import GenresFilter from '../../components/Filter/GenresFilter/GenresFilter'


let filters={}



const sortbyData = [
    { value: "popularity.desc", 
        label: "Most popular"
     },
   
    { 
        value: "vote_average.desc", 
        label: "Top rated" },
   
    {
        value: "primary_release_date.desc",
        label: "Latest",
    },
    { 
        value: "original_title.asc", 
        label: "Title (A-Z)" 
    },
];

const Explore = () => {
    const navigate=useNavigate()
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState([]);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();
    const {url}=useSelector((state)=>state.content)
    const { watchlist } = useSelector((state) => state.auth);





    const fetchInitialData = () => {
        setLoading(true);
        fetchContent(`/discover/${mediaType}`, { ...filters, with_genres: filters.with_genres }).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchContent(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        

        setPageNum(1);
        fetchInitialData();
    };

    



    return (
        <div className="explore-page">
            
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />

                       <GenresFilter/>
                      
                    </div>
                </div>
                
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                
                            >
                              <div className="result-container">
                              {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    const posterUrl=item.poster_path ? url.poster + item.poster_path : url.backdrop + item.backrop_path
                                    return (
                                        <Card
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                            
                                            title={item.title || item.name} 
                                            imageUrl={posterUrl} 
                                            handleNavigate={()=>navigate(`/${item?.media_type || mediaType}/${item.id}`)}
                                            fromSearch={true} 
                                        />
                                    );
                                })}

                              </div>
                              
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
         
        </div>
    );
};

export default Explore;
