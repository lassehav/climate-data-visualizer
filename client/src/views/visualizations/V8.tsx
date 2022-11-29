import React, { useEffect, useState } from "react";
import PresetLineChart from "../../components/PresetLineChart";
import axios from "axios";

interface V8API extends Array<any> {}

export default function V8() {
  const [data, setData] = useState<V8API>();
  useEffect(() => {
    async function getV8data() {
      const results = await axios.get(
        process.env.REACT_APP_API_ADDRESS + "/api/climate/v8data"
      );
      setData(results.data);
    }
    getV8data();
  }, []);

  if (data == undefined || data == undefined) {
    return null;
  }

  // Get the country names, first element is year so remove it from names
  const countryLabels = Object.keys(data[0]).slice(1);

  let countryEmissions = countryLabels.map((countryName) => {
    let emissions = [];
    // Loop over the year 'rows'
    for (let i = 0; i < data.length; i++) {
      // original value in MtC
      // datasource documentation 1MtC = 1 million tonne of carbon = 3.664 million tonnes of CO2
      emissions.push(data[i][countryName] * 3.664);
    }
    return {
      label: countryName.replace("_", " "),
      data: emissions,
    };
  });

  // Sort the countries for better visual presentation
  countryEmissions.sort((a, b) =>
    a.data[a.data.length - 1] > b.data[b.data.length - 1] ? 1 : -1
  );

  const years = [];
  for (let i = 0; i < data.length; i++) {
    years.push(data[i].Year);
  }

  return (
    <div>
      V8 County Co2 Emissions
      <PresetLineChart
        datasets={countryEmissions}
        description="V8"
        xScaleType="category"
        yScaleType="stacked"
        yScaleUnitText="MtCO2/yr"
        globalLabels={years}
        legendFontSize={10}
      />
      <div>
        Data: Friedlingstein et al. 2021
        <br />
        Methods: Full details of the method are described in Friedlingstein et
        al (2021) and Andrew and Peters (2021)
      </div>
    </div>
  );
}
