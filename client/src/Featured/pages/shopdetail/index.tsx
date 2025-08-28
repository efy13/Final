"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

/* ---- küçük yardımcılar ---- */
type Review = {
  id: string;
  author: string;
  date: string;
  avatar: string;
  rating: number; // 1..5
  text: string;
  helpfulUp: number;
  helpfulDown: number;
};

function Stars({
  value,
  size = 18,
  onChange,
}: {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
}) {
  const Star = ({ filled }: { filled: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={filled ? "fill-current" : "fill-transparent stroke-current"}
    >
      <path
        strokeWidth="1.5"
        d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"
      />
    </svg>
  );
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange?.(n)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          aria-label={`Rate ${n}`}
        >
          <Star filled={n <= value} />
        </button>
      ))}
    </div>
  );
}

const ShopDetail = () => {
  const imageUrl =
    "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-4.jpg";

  // ---- Zoom ----
  const boxRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [bgPos, setBgPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  function updateBgPos(clientX: number, clientY: number) {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    const y = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
    setBgPos({ x: x * 100, y: y * 100 });
  }
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    updateBgPos(e.clientX, e.clientY);
  }

  // ---- Count ----
  const [count, setCount] = useState(1);

  // ---- Tabs ----
  const [tab, setTab] = useState<"desc" | "add">("desc");

  // ---- Reviews State ----
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "r1",
      author: "rosetyler",
      date: "February 28, 2025",
      avatar: "https://i.pravatar.cc/96?img=5",
      rating: 5,
      text:
        "Dignissim volutpat et placerat, leo erat augue malesuada. Est dapibus imperdiet eleifend nulla nec habitasse massa tristique nascetur. Feugiat tincidunt odio sollicitudin nisl fames habitant inceptos sed. Pretium nunc phasellus nam laoreet suspendisse enim.",
      helpfulUp: 0,
      helpfulDown: 0,
    },
  ]);
  const total = reviews.length || 1;
  const avg =
    Math.round(
      (reviews.reduce((s, r) => s + r.rating, 0) / total) * 100
    ) / 100;
  const counts = [1, 2, 3, 4, 5].reduce<Record<number, number>>((m, n) => {
    m[n] = reviews.filter((r) => r.rating === n).length;
    return m;
  }, {});

  // ---- Review Form ----
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [remember, setRemember] = useState(false);

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!formRating || !formText || !formName || !formEmail) return;

    const newReview: Review = {
      id: crypto.randomUUID(),
      author: formName,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
        formName
      )}`,
      rating: formRating,
      text: formText,
      helpfulUp: 0,
      helpfulDown: 0,
    };
    setReviews((r) => [newReview, ...r]);

    if (remember) {
      try {
        localStorage.setItem(
          "reviewUser",
          JSON.stringify({ formName, formEmail })
        );
      } catch {}
    }
    setFormRating(0);
    setFormText("");
  }

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* SOL: Ürün resmi */}
        <div
          ref={boxRef}
          style={{ width: "619.1px", height: "721.25px" }}
          className="relative overflow-hidden rounded-md bg-neutral-100 mx-auto"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={onMouseMove}
        >
          {!zoomed && (
            <Image
              src={imageUrl}
              alt="Artwork"
              fill
              className="object-cover"
              priority
              sizes="619px"
            />
          )}
          {zoomed && (
            <div
              className="absolute inset-0 cursor-zoom-in"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "200% 200%",
                backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
                transition: "background-position 40ms linear",
              }}
            />
          )}
          {/* büyüteç */}
          <div className="absolute left-3 top-3 z-10 rounded-md bg-white/90 px-2 py-1 shadow-sm select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* SAĞ: Ürün bilgileri */}
        <div className="space-y-5 ml-10">
          <nav className="text-gray-400 text-sm">
            Home › Vibrant Still Life › Autumn Woodland Pathway
          </nav>
          <div className="text-2xl font-semibold text-gray-800">$3,650.00</div>
          <h1 className="text-3xl md:text-4xl font-medium">Autumn Woodland Pathway</h1>

          {/* Rating */}
          <div className="flex gap-1 text-black">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
              </svg>
            ))}
          </div>

          <p className="text-gray-600 leading-7">
            “Serene Mountain Forest” is a captivating oil painting that transports you
            to a peaceful woodland scene…
          </p>

          {/* Count + Add To Cart */}
          <div className="flex items-stretch gap-3">
            <div className="flex items-center border rounded">
              <button
                className="px-3 py-2"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
              >
                −
              </button>
              <span className="px-4 py-2 border-x">{count}</span>
              <button className="px-3 py-2" onClick={() => setCount((c) => c + 1)}>
                +
              </button>
            </div>
            <button
              style={{ width: "397.14px", height: "56.59px" }}
              className="bg-black text-white rounded hover:opacity-90 transition"
            >
              Add To Cart
            </button>
          </div>

          {/* Buy Now */}
          <button
            style={{ width: "491.64px", height: "56.69px" }}
            className="flex items-center justify-center gap-2 border px-6 py-3 rounded hover:bg-black hover:text-white transition"
          >
            <ShoppingBag size={20} />
            BUY NOW
          </button>

          {/* Extra Info */}
          <div className="text-sm text-gray-500 space-y-1">
            <div>
              <span className="font-medium text-gray-700">Categories:</span>{" "}
              Vibrant Still Life
            </div>
            <div>
              <span className="font-medium text-gray-700">Estimated delivery:</span>{" "}
              4 days
            </div>
          </div>
        </div>
      </div>

      {/* ---- Tabs Section ---- */}
      <div className="mt-14 text-center">
        <div className="flex justify-center gap-10">
          <button
            onClick={() => setTab("desc")}
            className={`relative pb-3 text-2xl font-semibold transition ${
              tab === "desc" ? "text-black" : "text-gray-400"
            }`}
          >
            Description
            <span
              className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded bg-black transition-all duration-300 ${
                tab === "desc" ? "w-full" : "w-0"
              }`}
            />
          </button>

          <button
            onClick={() => setTab("add")}
            className={`relative pb-3 text-2xl font-semibold transition ${
              tab === "add" ? "text-black" : "text-gray-400"
            }`}
          >
            Additional Information
            <span
              className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded bg-black transition-all duration-300 ${
                tab === "add" ? "w-full" : "w-0"
              }`}
            />
          </button>
        </div>
        <div className="mt-2 h-px bg-gray-200" />
        <div className="pt-8 text-[14px] leading-8 text-gray-600">
          {tab === "desc" ? (
            <p className="indent-8 text-justify">
              “Serene Mountain Forest” is a captivating oil painting that transports
              you to a peaceful woodland scene. The painting features a lush green
              forest with towering trees, their leaves a mix of vibrant greens and
              subtle yellows, hinting at the early stages of autumn. The mountains in
              the background are painted with a soft, misty effect, creating a sense
              of depth and tranquility. The artist has used delicate brushstrokes to
              capture the play of light filtering through the trees, casting dappled
              shadows on the forest floor. This piece evokes a sense of calm and
              connection with nature, making it a perfect addition to any home or
              office space.
            </p>
          ) : (
            <ul className="mx-auto max-w-2xl list-disc text-left space-y-2 pl-6">
              <li>Medium: Oil on canvas</li>
              <li>Size: 60 × 90 cm</li>
              <li>Frame: Optional (natural wood)</li>
              <li>Care: Avoid direct sunlight and humidity</li>
              <li>Shipping: 3–5 business days</li>
            </ul>
          )}
        </div>
      </div>

      {/* ---- Reviews Section ---- */}
      <section className="mx-auto mt-12 grid grid-cols-1 gap-10 py-6 md:grid-cols-2">
        {/* LEFT: Ortalama + histogram + liste */}
        <div className="space-y-8">
          <div className="rounded border p-6">
            <div className="text-6xl font-semibold">{avg.toFixed(2)}</div>
            <div className="mt-1">
              <Stars value={Math.round(avg)} size={20} />
            </div>
            <div className="mt-2 text-sm text-neutral-500">
              Based on {total} review{total > 1 ? "s" : ""}
            </div>

            {/* histogram */}
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((n) => {
                const ratio = (counts[n] || 0) / total;
                return (
                  <div className="flex items-center gap-3" key={n}>
                    <div className="flex items-center gap-1">
                      <Stars value={n} size={14} />
                    </div>
                    <div className="h-2 flex-1 rounded bg-neutral-200">
                      <div
                        className="h-2 rounded bg-green-700"
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                    <div className="w-6 text-right text-sm text-neutral-600">
                      {counts[n] || 0}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <h3 className="text-xl font-semibold">
            {total} Review For Autumn Woodland Pathway
          </h3>

          <div className="space-y-6">
            {reviews.map((r) => (
              <article key={r.id} className="border-t pt-6 first:border-t-0">
                <div className="flex items-center gap-4">
                  <img
                    src={r.avatar}
                    alt={r.author}
                    className="h-14 w-14 rounded object-cover"
                  />
                  <div className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-800">
                      {r.author}
                    </span>{" "}
                    – {r.date}
                    <div className="mt-1">
                      <Stars value={r.rating} />
                    </div>
                  </div>
                </div>
                <p className="mt-3 leading-7 text-neutral-700">{r.text}</p>

                <div className="mt-3 flex items-center gap-3 text-sm text-neutral-600">
                  <span>Is it helpful?</span>
                  <button
                    className="flex items-center gap-1 rounded border px-2 py-0.5"
                    onClick={() =>
                      setReviews((list) =>
                        list.map((it) =>
                          it.id === r.id
                            ? { ...it, helpfulUp: it.helpfulUp + 1 }
                            : it
                        )
                      )
                    }
                  >
                    <span>👍</span>
                    <span>{r.helpfulUp}</span>
                  </button>
                  <button
                    className="flex items-center gap-1 rounded border px-2 py-0.5"
                    onClick={() =>
                      setReviews((list) =>
                        list.map((it) =>
                          it.id === r.id
                            ? { ...it, helpfulDown: it.helpfulDown + 1 }
                            : it
                        )
                      )
                    }
                  >
                    <span>👎</span>
                    <span>{r.helpfulDown}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT: Add a Review */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Add A Review</h3>
          <p className="text-sm text-neutral-500">
            Your email address will not be published. Required fields are marked
            <span className="text-red-600"> *</span>
          </p>

          <form onSubmit={submitReview} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Your rating <span className="text-red-600">*</span>
              </label>
              <Stars value={formRating} size={20} onChange={setFormRating} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Your review <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                className="h-40 w-full resize-y rounded border p-3 outline-none focus:border-black"
                placeholder="Write your thoughts here…"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full rounded border p-3 outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full rounded border p-3 outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border"
              />
              Save my name, email, and website in this browser for the next time I
              comment.
            </label>

            <button
              type="submit"
              className="rounded border px-6 py-3 font-medium transition hover:bg-black hover:text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ShopDetail;
