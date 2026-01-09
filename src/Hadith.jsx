import React, { useEffect, useState } from "react";
import "./index.css";

const Hadith = () => {
  const [book, setBook] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [urdu, setUrdu] = useState("");
  const [arabic, setArabic] = useState("");
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState("");

  const generate = async () => {
    setLoading(true);

    const page = 1179;
    const perpage = 25;

    const rpage = Math.floor(Math.random() * page);
    const random = Math.floor(Math.random() * perpage);

    const apiUrl = `https://hadithapi.com/api/hadiths?page=${rpage}&apiKey=$2y$10$K5c4MswceLti9g4Gz0wZCaFgoMv4OFKLQvuWVTvctsOEvaNUvc2`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
        setdata(data);
      const main = data.hadiths.data[random];

      setBook(main.book.bookName);
      setNumber(main.hadithNumber);
      setArabic(main.hadithArabic);
      setUrdu(main.hadithUrdu);
      setStatus(main.status);
      setChapter(main.chapter.chapterArabic);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="hadith-wrapper">
      <div className="card">
        <span className="label">Book Name</span>
        <h2>{book}</h2>
      </div>
      
      <div className="card row">
        <span className="label">Chapter :</span>
        <p>{chapter}</p>
      </div>

      <div className="card">
        
        <span className="label">Hadith</span>
        <p className="arabic">{arabic}</p>

        <span className="label">ترجمہ</span>
        <p className="urdu">{urdu}</p>
      </div>

      <div className="card row space">
        <div>
          <span className="label">Hadith #</span>
          <p>{number}</p>
        </div>
        <div>
          <span className="label">Status #</span>
          <p>{status}</p>
        </div>
      </div>

      <button onClick={generate} disabled={loading}>
        {loading ? "Loading..." : "Generate Hadith"}
      </button>
    </div>
  );
};

export default Hadith;
