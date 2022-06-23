import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Person() {
  const [billionaire, setbillionaire] = useState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(
          `https://billions-api.nomadcoders.workers.dev/person/${router.query.id}`
        )
      ).json();
      setbillionaire(results);
    })();
  }, []);

  console.log(billionaire);
  return (
    <div className="main">
      <div key={billionaire?.id}>
        <img src={billionaire?.squareImage} alt="..." />
        <div className="marginB" style={{ fontSize: "30px" }}>
          <span>{billionaire?.name}</span>
        </div>
        <div className="marginB">
          <span>
            Networth:{" "}
            {String(billionaire?.netWorth).split(".")[0].length == 6
              ? String(billionaire?.netWorth).split(".")[0].slice(0, 3)
              : String(billionaire?.netWorth).split(".")[0].length == 5
              ? String(billionaire?.netWorth).split(".")[0].slice(0, 2)
              : String(billionaire?.netWorth).split(".")[0].slice(0, 1)}{" "}
            Billion
          </span>
        </div>
        <div className="marginB">
          <span>Country: {billionaire?.country}</span>
        </div>
        <div className="marginB">
          <span>Industry: {billionaire?.industries[0]}</span>
        </div>
        <div className="marginB">
          <span>{billionaire?.bio[0]}</span>
          <span>{billionaire?.bio[1]}</span>
          <span>{billionaire?.bio[2]}</span>
          <span>{billionaire?.bio[3]}</span>
        </div>
        <div className="Assets">
          <div style={{ marginBottom: "20px" }}>Financial Assets</div>
          <div className="AssetsList">
            {billionaire?.financialAssets?.map((fin) => (
              <div className="gridAssets" key={fin.id}>
                <div>Ticker: {fin.ticker}</div>
                <div>
                  Shares:{" "}
                  {fin.numberOfShares
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div>
                  {fin?.exerciseOptionPrice
                    ? "Excersise Price: $" + fin?.exerciseOptionPrice
                    : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .gridAssets {
          border: 0.5px solid white;
          padding: 2%;
          margin: 4%;
          font-size: 13px;
          border-radius: 0.3rem;
        }
        .Assets {
          color: white;
          margin-top: 20px;
          font-size: 30px;
          background-color: black;
        }
        .AssetsList {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          color: white;
          background-color: black;
        }
        img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          overflow: hidden;
        }
        .main {
          height: 100vh;
          background-color: black;
          padding: 0;
          margin: 0;
        }
        span {
          color: white;
        }
        .marginB {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
