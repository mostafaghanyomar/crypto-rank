import * as actions from "../index";
import axios from "axios";
const EXCLUSIONS = ["USDT","USDC","TUSD","DAI",];


export const service = () => {
  return (dispatch) => {
    console.log('service');
    dispatch(actions.requestSent());
    let url = 'https://api.flipsidecrypto.com/api/v2/metrics/rank/projects?api_key=f1097b49-4598-4b23-8731-6ca5e55246e2';
    let url2 = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    axios
      .post(url, {"metric":"fcas"})
      .then((r) => {
        let fCas = r.data.data.filter(d => d.value >= 900 && !contains(EXCLUSIONS, d.symbol));
        axios
        .get(url2, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
        .then((r) => {
          let symbolsFilter = fCas.map(v => v.symbol);
          let set = [];
          let fCap = r.data.filter(v => contains(symbolsFilter, v.symbol.toUpperCase()));
          for(let i =0;i<fCap.length;i++) {
            let newFCap = fCap[i];
            for(let j=0;j<fCas.length;j++) {
              let newFCas = fCas[j];
              let filter = set.map(sV => sV.symbol);
              if(!contains(filter, newFCap.symbol) && newFCas.symbol === newFCap.symbol.toUpperCase()) {
                set.push({
                  ...newFCap,
                  ...newFCas
                });
              }
            }
          }
          set = set.sort((a, b) =>  b.value - a.value);
          dispatch(actions.setData(set));
          dispatch(actions.requestResolved());
        })
        .catch((err)=>{
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