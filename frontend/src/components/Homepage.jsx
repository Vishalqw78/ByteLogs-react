import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useHistory and useLocation from react-router-dom
import "../styles/abc.css";
import "../styles/abcd.css";
import "../config/theme.json";
import Pagination from "./Pagination"; // Import Pagination component

export default function LivePortal() {
  const PageSize = 7;
  const fontFamily = "Mulish, sans-serif";
  const data = [
    {
      title: "How to make toys from old Olarpaper",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "03 Apr 2023",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "How to make toys from old Olarpaper",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "03 Apr 2023",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "How to make toys from old Olarpaper",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "03 Apr 2023",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "How to make toys from old Olarpaper",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "03 Apr 2023",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "How to make toys from old Olarpaper",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "03 Apr 2023",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F03.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F05.jpg&w=1080&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "DIY Paper Diamond Tutorial with HUNGRY HEART",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "11 Aug 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
    {
      title: "11What you need to know about Photography",
      image:
        "https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75",
      author: "Mark Dinn",
      date: "01 Jun 2022",
      category: "Art",
      content:
        "Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blan ...",
    },
  ];
  const navigate = useNavigate(); // Initialize useHistory
  const location = useLocation(); // Initialize useLocation

  // Extract current page number from URL
  const currentPageFromUrl = parseInt(location.pathname.split("/")[2]) || 1;

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
    navigate(`/page/${page}`);
  };

  useEffect(() => {
    if (location.pathname === "/page/1") {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="flex flex-wrap row space-y-16 mb-16">
            {currentTableData.map((data, i) => (
              <div
                key={i}
                className={`p-1 py-8 sm:py-4 ${
                  i === 0 ? "col-12 sm:col-6" : "col-12 sm:col-6 sm:w-1/2"
                }`}
              >
                <img
                  alt={data.title}
                  src={data.image}
                  width={i === 0 ? "925" : "445"}
                  height={i === 0 ? "475" : "230"}
                  decoding="async"
                  data-nimg="1"
                  className="rounded-lg"
                  loading="lazy"
                  style={{ color: "transparent" }}
                />
                <ul className="mt-4 mb-4 flex flex-wrap items-center space-x-3 text-text spaced">
                  <li className="hover:text-teal-500">
                    <a className="flex items-center" href="/authors/mark-dinn">
                      <img
                        alt="Mark Dinn"
                        src="https://bookworm-light-nextjs.vercel.app/_next/image?url=%2Fimages%2Fposts%2F01.jpg&w=1920&q=75"
                        width="50"
                        height="50"
                        decoding="async"
                        data-nimg="1"
                        className="mr-2 h-6 w-6 rounded-full"
                        loading="lazy"
                        style={{ color: "transparent" }}
                      />
                      <span>{data.author}</span>
                    </a>
                  </li>
                  <li>{data.date}</li>
                  <li className="hover:text-teal-600">
                    <ul>
                      <li className="inline-block">
                        <a
                          className="mr-3 hover:text-teal-500"
                          href="/categories/art"
                        >
                          ▣ {data.category}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <h3 className="mb-2 hover:text-teal-500">
                  <a
                    className="block hover:text-primary"
                    href={`/post-${i + 1}`}
                  >
                    {data.title}
                  </a>
                </h3>
                <p className="text-text">{data.content}</p>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={handlePageChange} // Pass the handlePageChange function
        />
      </div>
    </>
  );
}
