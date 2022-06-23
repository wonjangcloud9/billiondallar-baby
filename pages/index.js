import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const router = useRouter();
  const onClick = (id) => {
    router.push(
      {
        pathname: `/person/${id}`,
      },
      `/person/${id}`
    );
  };
  return (
    <div className="Hi">
      <div className="main">
        {!bills && <h4>Loading...</h4>}
        {bills?.map((bill) => (
          <div key={bill.id} onClick={() => onClick(bill.id)}>
            <img src={bill.squareImage} alt="..." />
            <div>
              <div>
                <Link
                  href={{
                    pathname: `/person/${bill.id}`,
                  }}
                  as={`/person/${bill.id}`}
                >
                  <a>{bill.name}</a>
                </Link>
              </div>
              <div>
                <span>
                  {String(bill.netWorth).split(".")[0].length == 6
                    ? String(bill.netWorth).split(".")[0].slice(0, 3)
                    : String(bill.netWorth).split(".")[0].length == 5
                    ? String(bill.netWorth).split(".")[0].slice(0, 2)
                    : String(bill.netWorth).split(".")[0].slice(0, 1)}{" "}
                  Billion {bill.industries[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        img {
          width: 100px;
          transition: transform 1s ease-out 100ms;
        }
        img:hover {
          transform: scale(1.2);
        }
        a {
          text-decoration: none;
          color: white;
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
