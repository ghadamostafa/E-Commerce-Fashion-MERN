import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import { Collapse, Tag, Radio } from "antd";
// import { Menu } from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import "./Filters.css";
const { CheckableTag } = Tag;
const { Panel } = Collapse;
const Filters = ({ getProducts, pageNumber }) => {
  let [categories, setCategories] = useState([]);
  let [tags, setTags] = useState([]);
  let [categoryFilter, setCategoryFilter] = useState("");
  let [tagFilter, setTagFilter] = useState("");
  let [selectedTag, setSelectedTag] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("");
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
  const handleTagChange = (tag, checked) => {
    console.log(tag);
    if (checked) setSelectedTag(tag);
    setTagFilter(tag.slug);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setSelectedCategory(e.target.value);
    setCategoryFilter(e.target.value);
  };
  return (
    <section>
      {/* categories filter */}
      <h6 className="text-uppercase font-weight-bold mb-3 filter-title-color">
        Categories
      </h6>
      <Radio.Group onChange={onChange} value={selectedCategory}>
        {categories.map((category) => {
          return (
            <div className="mt-2 mb-2 " key={category._id}>
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                ghost
                className="site-collapse-custom-collapse"
              >
                <Panel
                  key={category._id}
                  header={category.slug}
                  className="site-collapse-custom-panel"
                >
                  {category.subCategories.map((subCategory) => {
                    return (
                      <Radio value={subCategory.slug}>{subCategory.slug}</Radio>
                      // <Link
                      //   onClick={() => setCategoryFilter(subCategory.slug)}
                      //   className="category-color d-block ml-4"
                      //   to="#"
                      // >
                      //   {subCategory.name}
                      // </Link>
                    );
                  })}
                </Panel>
              </Collapse>
            </div>
          );
        })}
      </Radio.Group>
      {/* tags filter */}
      <div className="divider mt-5 mb-5 border-bottom border-secondary"></div>
      <section>
        <h6 className="text-uppercase font-weight-bold mb-3 filter-title-color">
          Tags
        </h6>
        <div>
          {tags.map((tag) => (
            <CheckableTag
              key={tag._id}
              checked={selectedTag.slug === tag.slug}
              onChange={(checked) => handleTagChange(tag, checked)}
            >
              {tag.slug}
            </CheckableTag>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Filters;
