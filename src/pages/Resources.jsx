import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ResourceCard from "../components/ResourceCard";
import CategoryFilter from "../components/CategoryFilter";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      const res = await api.get("/resources");
      const data = res.data;

      setResources(data);
      setFiltered(data);

      const cats = [...new Set(data.map((item) => item.category))];
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching resources", error);
    }
  }

  const filterByCategory = (cat) => {
    setActiveCategory(cat);

    if (cat === "all") {
      setFiltered(resources);
    } else {
      setFiltered(resources.filter((r) => r.category === cat));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Sustainable Food Resources
        </h1>

        <p className="text-gray-600">
          Explore categorized resources to understand and practice
          sustainability better.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={filterByCategory}
      />

      {/* Resource Cards */}
      <div className="grid sm:grid-cols-2 gap-5 mt-4">
        {filtered.length > 0 ? (
          filtered.map((item) => <ResourceCard key={item._id} item={item} />)
        ) : (
          <p className="text-gray-500">
            No resources available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Resources;
