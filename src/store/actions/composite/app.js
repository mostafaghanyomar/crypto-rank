import * as actions from "../index";
import axios from "axios";
const EXCLUSIONS = ["USDT", "USDC", "TUSD", "DAI"];

export const service = () => {
  return (dispatch) => {
    console.log("service");
    dispatch(actions.requestSent());
    let url =
      "https://api.flipsidecrypto.com/api/v2/metrics/rank/projects?api_key=f1097b49-4598-4b23-8731-6ca5e55246e2";
    let url2 =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    let url3 = "https://static.coinpaper.io/api/coins.json";

    Promise.all([
      axios.post(url, { metric: "fcas" }),
      axios.get(url2, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      axios.get(url3),
    ])
      .then((r) => {
        console.log(r);
        let fCas = r[0].data.data.filter(
          (d) => d.value >= 900 && !contains(EXCLUSIONS, d.symbol)
        );
        let symbolsFilter = fCas.map((v) => v.symbol);
        let set = [];
        let fCap = r[1].data.filter((v) =>
          contains(symbolsFilter, v.symbol.toUpperCase())
        );
        let aTrend = r[2].data.filter((v) =>
          contains(symbolsFilter, v.symbol.toUpperCase())
        );
        let idsFilter = aTrend.map((v) => v.id);
        Promise.all(
          idsFilter.map((id) =>
            axios.get("https://static.coinpaper.io/api/coins/" + id + ".json")
          )
        )
          .then((prds) => {
            for (let i = 0; i < fCap.length; i++) {
              let newFCap = fCap[i];
              for (let j = 0; j < fCas.length; j++) {
                let newFCas = fCas[j];
                for (let k = 0; k < aTrend.length; k++) {
                  let newATrend = aTrend[k];
                  for (let l = 0; l < prds.length; l++) {
                    let prd = prds[l].data;
                    let filter = set.map((sV) => sV.symbol);
                    if (
                      !contains(filter, newFCap.symbol) &&
                      newFCas.symbol === newFCap.symbol.toUpperCase() &&
                      newATrend.symbol === newFCas.symbol &&
                      prd.symbol === newFCas.symbol
                    ) {
                      set.push({
                        name: newFCap.name,
                        symbol: newFCas.symbol,
                        value: newFCas.value,

                        "market_cap": newFCap['market_cap'],
                        "market_cap_rank": newFCap['market_cap_rank'],
                        "price_change_percentage_24h": newFCap['price_change_percentage_24h'],
                        "total_volume": newFCap['total_volume'],
                        "current_price": newFCap['current_price'],

                        id: newATrend.id,
                        "algorithmic_rating": newATrend['algorithmic_rating'],
                        "manual_rating": newATrend['manual_rating'],
                        "price_7d_percentage_change": newATrend['price_7d_percentage_change'],
                        "image": newATrend['image'],

                        "marketcap_24h_percentage_change": prd.market["marketcap_24h_percentage_change"],
                        "price_1h_percentage_change": prd.market["price_1h_percentage_change"],
                        "price_24h_percentage_change": prd.market["price_24h_percentage_change"],
                        "price_7d_percentage_change": prd.market["price_7d_percentage_change"],
                        "price_30d_percentage_change": prd.market["price_30d_percentage_change"],
                        "price_1y_percentage_change": prd.market["price_1y_percentage_change"],
                        "price_BTC": prd.market["price_BTC"],
                        "volume_24h_percentage_change": prd.market["volume_24h_percentage_change"],
                        "predicted_price_24h": prd.market.prediction["predicted_price_24h"],
                        "predicted_percentage_change_24h": prd.market.prediction["predicted_percentage_change_24h"],
                        "predicted_price_14d": prd.market.prediction["predicted_price_14d"],
                        "predicted_percentage_change_14d": prd.market.prediction["predicted_percentage_change_14d"],
                        "total_marketcap": prd.market.overview["total_marketcap"],
                        "total_volume_24h": prd.market.overview["total_volume_24h"],
                        "bitcoin_dominance_percentage": prd.market.overview["bitcoin_dominance_percentage"],
                        "total_number_of_cryptocurrencies": prd.market.overview["total_number_of_cryptocurrencies"],
                        "total_marketcap_all_time_high_price": prd.market.overview["total_marketcap_all_time_high_price"],
                        "total_marketcap_all_time_high_date": prd.market.overview["total_marketcap_all_time_high_date"],
                        "total_marketcap_24h_percentage_change": prd.market.overview["total_marketcap_24h_percentage_change"],
                        "total_volume_24h_percentage_change": prd.market.overview["total_volume_24h_percentage_change"],
                      });
                    }
                  }
                }
              }
            }
            set = set.sort((a, b) => b.value - a.value);
            dispatch(actions.setData(set));
            dispatch(actions.requestResolved());
          })
          .catch((err) => {
            //err
            console.log(err);
            dispatch(actions.requestResolved());
          });
      })
      .catch((err) => {
        //err
        console.log(err);
        dispatch(actions.requestResolved());
      });
  };
};

function contains(arr, v) {
  return arr.indexOf(v) !== -1;
}
