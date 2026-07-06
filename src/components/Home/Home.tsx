import { useState, useMemo } from "react";
import type { Goods } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import "./Home.css";

function SkeletonCard() {
  return (
    <div className="productCard">
      <div className="skeleton" style={{ height: 200, borderRadius: 0 }} />
      <div className="productInfo">
        <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, width: "80%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 22, width: "35%" }} />
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const { data: goods, isLoading } = useQuery<Goods[]>({
    queryKey: ["products"],
    queryFn: () =>
      axios
        .get("https://dummyjson.com/products")
        .then((res) => res.data.products),
  });

  const filteredGoods = useMemo(() => {
    const query = appliedSearch.toLowerCase();
    if (!query) return goods ?? [];
    return (goods ?? []).filter(
      (good) =>
        good.category.toLowerCase().includes(query) ||
        good.title.toLowerCase().includes(query),
    );
  }, [appliedSearch, goods]);

  const handleSearch = () => setAppliedSearch(search);

  return (
    <>
      {!appliedSearch && (
        <div className="banner">
          <div className="bannerContent">
            <span className="bannerTag">Летняя распродажа</span>
            <h2 className="bannerTitle">Скидки до 50%</h2>
            <p className="bannerText">На популярные категории товаров</p>
            <button className="bannerBtn" onClick={() => setAppliedSearch("smartphones")}>
              Смотреть смартфоны
            </button>
          </div>
        </div>
      )}

      <div className="home">
      <div className="searchBar">
        <FiSearch size={18} className="searchIcon" />
        <input
          placeholder="Поиск товаров..."
          className="searchInput"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {appliedSearch && (
        <p className="searchResult">
          Результаты по запросу «{appliedSearch}» — {filteredGoods.length} товаров
        </p>
      )}

      <div className="grid">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredGoods.map((good) => (
              <div
                className="productCard"
                onClick={() => navigate(`/product/${good.id}`)}
                key={good.id}
              >
                <div className="productImageWrap">
                  <img
                    className="productImage"
                    src={good.thumbnail}
                    alt={good.title}
                    loading="lazy"
                  />
                </div>
                <div className="productInfo">
                  <span className="productCategory">{good.category}</span>
                  <h3 className="productTitle">{good.title}</h3>
                  <div className="productPrice">
                    {good.price} $
                  </div>
                </div>
              </div>
            ))}
      </div>
      </div>
    </>
  );
}

export default Home;
