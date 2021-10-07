import React, { useState, useEffect } from "react";
import Axios from "axios";

import { HaircutStatus } from "./export";

const HaircutPrice = ({ protocol, host }) => {
  const [haircutPrice, setHaircutPrice] = useState([]);
  const [bossEarnings, setBossEarnings] = useState([]);
  const [priceTotal, setPriceTotal] = useState();
  const [priceBossEarnings, setPriceBossEarnings] = useState();
  const [errorDB, setErrorDB] = useState(false);

  useEffect(() => {
    let protocol = window.location.protocol,
      host = window.location.hostname;

    const gettingData = async () => {
      try {
        const gettinPrice = await Axios.get(
          `${protocol}//${host}:8081/api/haircut-price`
        ).then((response) => {
          setHaircutPrice(response.data);
          setPriceTotal(response.data[0].price);
        });

        const gettingEarnings = await Axios.get(
          `${protocol}//${host}:8081/api/get-bossearnings`
        ).then((response) => {
          setBossEarnings(response.data);
          setPriceBossEarnings(response.data[0].boss_earnings);
        });
      } catch (error) {
        setErrorDB(true);
      }
    };

    gettingData();
  }, []);

  const incrementDecrement = (id, price) => {
    try {
      Axios.put(`${protocol}//${host}:8081/api/update-price`, {
        id,
        haircutPrice: price,
      });
    } catch (error) {
      setErrorDB(true);
    }
  };

  const incrementDecrementBossEarnings = (id, modifyBossEarnings) => {
    try {
      Axios.put(`${protocol}//${host}:8081/api/update-bossearnings`, {
        id,
        modifyBossEarnings,
      });
    } catch (error) {
      setErrorDB(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="md:flex md:justify-center md:items-center">
        <div>
          {haircutPrice.length > 0 ? (
            haircutPrice.map((price) => (
              <div
                className="flex items-center justify-center flex-col"
                key={price.id_price}
              >
                <div className="flex mb-.5">
                  <h2 className="text-base font-lora">
                    Precio del corte {price.price}
                  </h2>
                  <img
                    alt="Dollar symbol"
                    className="w-6"
                    src="/assets/dollar-symbol.png"
                  />
                </div>
                <div>
                  <button
                    className="w-26 bg-blue-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
                    onClick={() => {
                      setPriceTotal((price.price += 0.5));
                      incrementDecrement(price.id_price, price.price);
                    }}
                  >
                    Aumentar precio
                  </button>
                  {price.price <= 0 ? (
                    <button
                      className="w-26 bg-gray-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
                      disabled={true}
                    >
                      Disminuir precio
                    </button>
                  ) : (
                    <button
                      className="w-26 bg-red-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
                      onClick={() => {
                        setPriceTotal((price.price -= 0.5));
                        incrementDecrement(price.id_price, price.price);
                      }}
                    >
                      Disminuir precio
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="mt-3.5">
              <h2 className="text-center text-red-600">
                No se encuentra el precio del corte
              </h2>
            </div>
          )}
        </div>
        <div>
          {bossEarnings.length > 0 ? (
            bossEarnings.map((earnings) => (
              <div
                className="flex items-center justify-center flex-col my-2.5"
                key={earnings.id_boss}
              >
                <div className="flex mb-.5">
                  <h2 className="text-base font-lora">
                    Ganancias del jefe {earnings.boss_earnings}
                  </h2>
                  <img
                    alt="Dollar symbol"
                    className="w-6"
                    src="/assets/dollar-symbol.png"
                  />
                </div>
                <div>
                  <button
                    className="w-26 bg-blue-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
                    onClick={() => {
                      setPriceBossEarnings((earnings.boss_earnings += 0.5));
                      incrementDecrementBossEarnings(
                        earnings.id_boss,
                        earnings.boss_earnings
                      );
                    }}
                  >
                    Aumentar precio
                  </button>
                  {earnings.boss_earnings <= 0 ? (
                    <button
                      className="w-26 bg-gray-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
                      disabled={true}
                    >
                      Disminuir precio
                    </button>
                  ) : (
                    <button
                      className="w-26 bg-red-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
                      onClick={() => {
                        setPriceBossEarnings((earnings.boss_earnings -= 0.5));
                        incrementDecrementBossEarnings(
                          earnings.id_boss,
                          earnings.boss_earnings
                        );
                      }}
                    >
                      Disminuir precio
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="mt-3.5">
              <h2 className="text-center text-red-600">
                Aun no se ha definido las ganancias del jefe
              </h2>
            </div>
          )}
        </div>
      </div>
      {errorDB ? (
        <p className="text-center text-red-600">Something went wrong</p>
      ) : (
        false
      )}
      <div>
        <HaircutStatus
          priceTotal={priceTotal}
          priceBossEarnings={priceBossEarnings}
          protocol={protocol}
          host={host}
        />
      </div>
    </div>
  );
};

export default HaircutPrice;
