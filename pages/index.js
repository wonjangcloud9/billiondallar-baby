import { useEffect, useState } from "react";

export default function Home() {
  const [bills, setBills] = useState();
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch("https://billions-api.nomadcoders.workers.dev")
      ).json();
      setBills(results);
    })();
  }, []);
  return (
    <div className="Hi">
      <div className="main">
        {!bills && <h4>Loading...</h4>}
        {bills?.map((bill) => (
          <div key={bill.id}>
            <img src={bill.squareImage} alt="..." />
            <div>
              <div>
                <span>{bill.name}</span>
              </div>
              <div>
                <span>
                  {bill.netWorth} / {bill.industries[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        img {
          width: 100px;
        }
        .main {
          padding: 2% 3%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        .Hi {
          background-color: black;
        }
        span {
          color: white;
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}
