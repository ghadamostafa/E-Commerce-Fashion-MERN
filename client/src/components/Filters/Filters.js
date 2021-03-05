import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./Filters.css";
const Filters = ({ getProducts, pageNumber }) => {
  let [categories, setCategories] = useState([]);
  let [tags, setTags] = useState([]);
  let [submenuToggle, setSubmenuToggle] = useState("hide");
  let [categoryFilter, setCategoryFilter] = useState("");
  let [tagFilter, setTagFilter] = useState("");
  const params = useLocation().search;
  let url = "/products";

  //fetch categories and tags for filters
  useEffect(() => {
    const fetchFiltersData = async () => {
      const { data } = await axios.get(`/filters`);
      setCategories(data.data.categories);
      setTags(data.data.tags);
    };
    fetchFiltersData();
  }, []);

  //fetch products
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    url += params
      ? `${params}&page=${pageNumber}`
      : `?category=${categoryFilter}&tag=${tagFilter}&page=${pageNumber}`;

    const fetchProducts = async () => {
      await axios
        .get(url)
        .then(({ data }) => {
          //send products to shop
          getProducts(true, data);
        })
        .catch((error) => {
          getProducts(false, error.response.data.message);
        });
    };
    fetchProducts();
  }, [categoryFilter, tagFilter, params, pageNumber]);

  const toggleSubmenu = () => {
    submenuToggle === "hide"
      ? setSubmenuToggle("show")
      : setSubmenuToggle("hide");
  };
  const highlightCategory = () => {};
  return (
    <section>
      {/* categories filter */}
      <h6 className="text-uppercase font-weight-bold mb-3 filter-title-color">
        Categories
      </h6>
      {categories.map((category) => {
        return (
          <div className="mt-2 mb-2 pl-2" key={category._id}>
             <ul className="list-unstyled list-inline">
                        <li >
                            <Link onClick={toggleSubmenu} className="category-color" to="#"> 
                            &gt; {category.name} </Link>
                            <ul className={submenuToggle}>
                                {category.subCategories.map((subCategory) => {
                                    return <li key={subCategory._id} 
                                    onClick={highlightCategory}>
                                    <Link onClick={() => setCategoryFilter(subCategory.slug)} 
                                        className="category-color" to="#">
                                            {subCategory.name}
                                    </Link></li>
                                })}
                            </ul>
                        </li>
                    </ul> 
           
          </div>
        );
      })}
      {/* tags filter */}
      <div className="divider mt-5 mb-5 border-bottom border-secondary"></div>
      <section>
        <h6 className="text-uppercase font-weight-bold mb-3 filter-title-color">
          Tags
        </h6>
        <div>
          {tags.map((tag) => {
            return (
              <button
                key={tag._id}
                className="btn btn-outline-secondary mr-2 mt-2"
                onClick={() => setTagFilter(tag.slug)}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Filters;
