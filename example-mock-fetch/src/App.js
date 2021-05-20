import React, {useEffect, useState} from "react";
import { convert } from "./utils/currency";

export default function App() {
  const [base, dest] = ["USD", "CAD"];
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(  ()=>{
    const fetchData = async () => {
      try {
        const rateData = await convert(base, dest);
        setRate(rateData);
      } catch(e){
        setError(e)
      }
    }
    fetchData()
  }, [])

  if (error) return <span>Error!</span>;
  if (!rate) return <span>Loading!</span>;

  return (
      <div>
        {base} to {dest} = {rate}
      </div>
  );
}
