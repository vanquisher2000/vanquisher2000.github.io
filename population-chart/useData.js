import React, { useState, useEffect } from 'react';
import { csv ,json,sort} from 'd3';

const csvUrl =
"https://gist.githubusercontent.com/vanquisher2000/913aa59cad9f45ad32c76336137eb343/raw/242c9cd510ec21b00b7c24a59388be141c761aad/japanesePopulation.csv";
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.total = +d.total;
      d.female = +d.female;
      d.male = +d.male;
      return d;
    };
    
    csv(csvUrl, row).then(data => {
      setData(data);
    });
  }, []);
  console.log(data);
  
  return data;
};