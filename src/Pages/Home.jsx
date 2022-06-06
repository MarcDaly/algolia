import React from "react";
import algoliasearch from "algoliasearch";
import {
    Hits,
    InstantSearch,
    RefinementList,
    SearchBox,
    Highlight,
    Configure,
    Pagination,
} from "react-instantsearch-hooks-web";
import "../Styles/Pages/Home.scss";
import AddRestaurantForm from "../Components/AddRestaurantForm";

// algolia setup
const searchClient = algoliasearch(
    "C346JDJQZ0",
    "884c6fa07902ce90ee418ddc0d7f17f7"
);
const index = searchClient.initIndex("restaurants");

function Hit({ hit }) {
    return (
        <div className="hit">
            <img
                className="hit-img"
                src={hit.image_url}
                alt={`${hit.name} restaurant`}
                width="200"
                height="200"
            ></img>
            <div className="hit-content">
                <h2>
                    <Highlight attribute="name" hit={hit} />
                </h2>
                <p>{hit.city}</p>
                <p>{hit.state}</p>
                <div className="ratings-reviews">
                    <p className="ratings">
                        {"\u2B50 ".repeat(hit.rounded_stars_count)}
                        {hit.reviews_count}
                    </p>
                </div>
                <p>{hit.phone_number}</p>
                <p>{hit.food_type}</p>
                <button
                    type="button"
                    onClick={() => index.deleteObject(hit.objectID)}
                >
                    Not Interested
                </button>
            </div>
        </div>
    );
}

function Home() {
    return (
        <div>
            <header className="header">
                <h1 className="header-title">Must Eat</h1>
            </header>

            <div>
                <InstantSearch
                    searchClient={searchClient}
                    indexName="restaurants"
                >
                    <Configure hitsPerPage={5} />

                    <div className="grid-container">
                        <div className="left-col">
                            <h4 className="side-col-title">
                                Craving something?
                            </h4>
                            <RefinementList
                                attribute="food_type"
                                sortBy={["count"]}
                                showMore={true}
                            />
                        </div>
                        <div className="middle-col">
                            <div className="controls">
                                <SearchBox
                                    className="controls-search"
                                    placeholder="Search by restaurant name"
                                />
                            </div>
                            <div className="hits">
                                <Hits hitComponent={Hit} />
                            </div>
                        </div>
                        <div className="right-col">
                            <h4 className="side-col-title">
                                Add your business!
                            </h4>
                            <AddRestaurantForm algoliaIndex={index} />
                        </div>
                    </div>

                    <div className="pagination">
                        <Pagination />
                    </div>
                </InstantSearch>
            </div>
        </div>
    );
}

export default Home;
