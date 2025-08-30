"use client";
import React, { useState } from "react";
import { Eye, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/http/api";
import Link from "next/link";
import { useCart } from "@/Providers/CartProvider";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  instock?: boolean;
  categories?: { name?: string };
};

const AllProducts: React.FC = () => {
  const { addToCart } = useCart();

  const [visibleCount, setVisibleCount] = useState(9);
  const [openSections, setOpenSections] = useState<
    Record<"category" | "status" | "price", boolean>
  >({
    category: true,
    status: true,
    price: true,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortOption, setSortOption] = useState<"default" | "lowToHigh" | "highToLow">("default");

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAPi("/products"),
  });

  const products: Product[] = data?.data ?? [];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([0, Number(e.target.value)]);
  };

  let filteredProducts = products.filter((p) => {
    const catName = p.categories?.name ?? "";
    const inCategory =
      selectedCategories.length === 0 || selectedCategories.includes(catName);

    const statusLabel = p.instock ? "In stock" : "Out of stock";
    const inStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(statusLabel);

    const price = Number(p.price ?? 0);
    const inPrice = price >= priceRange[0] && price <= priceRange[1];

    return inCategory && inStatus && inPrice;
  });

  if (sortOption === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else if (sortOption === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  if (isLoading) return <p className="text-center py-12">Loading...</p>;
  if (isError)
    return <p className="text-center py-12 text-red-500">Failed to load products.</p>;

  const categoryList = Array.from(
    new Set(products.map((p) => p.categories?.name).filter(Boolean))
  ) as string[];

  return (
    <section className="max-w-[1320px] mx-auto px-4 py-12 flex gap-8">
      {/* SIDEBAR */}
      <aside className="w-64 space-y-8 hidden md:block">
        {/* Category */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleSection("category")}
          >
            <h3 className="font-medium text-lg">Category</h3>
            {openSections.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {openSections.category && (
            <ul className="space-y-2 text-sm">
              {categoryList.map((cat) => (
                <li key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Status */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleSection("status")}
          >
            <h3 className="font-medium text-lg">Product Status</h3>
            {openSections.status ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {openSections.status && (
            <ul className="space-y-2 text-sm">
              {["In stock", "Out of stock"].map((status) => (
                <li key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => handleStatusChange(status)}
                  />
                  <span>{status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleSection("price")}
          >
            <h3 className="font-medium text-lg">Price</h3>
            {openSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {openSections.price && (
            <>
              <input
                type="range"
                min={0}
                max={5000}
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full accent-black"
              />
              <p className="text-sm mt-2">
                Price: ${priceRange[0]} — ${priceRange[1]}
              </p>
            </>
          )}
        </div>
      </aside>

      {/* LIST */}
      <div className="flex-1">
        <div className="flex justify-end mb-6">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
            className="border px-3 py-2 text-sm"
          >
            <option value="default">Default sorting</option>
            <option value="lowToHigh">Price: low to high</option>
            <option value="highToLow">Price: high to low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.slice(0, visibleCount).map((item) => (
            <div key={item._id}>
              <Link href={`/shop/${item._id}`}>
                <div className="relative overflow-hidden rounded-lg group h-[382px] w-full mb-4 cursor-pointer">
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 rounded-lg"
                  />
                  <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(item);
                      }}
                      className="bg-white rounded shadow p-2 hover:bg-gray-100"
                    >
                      <ShoppingBag size={20} className="text-gray-800" />
                    </button>
                    <button className="bg-white rounded shadow p-2 hover:bg-gray-100">
                      <Eye size={20} className="text-gray-800" />
                    </button>
                  </div>
                </div>
              </Link>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.categories?.name}</p>
              <div className="mt-1 text-base">
                <span className="text-[20px]">${Number(item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
