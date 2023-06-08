import {
  Box,
  Container,
  HStack,
  RadioGroup,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";
import Custombar from "../components/Custombar";
import Item from "../components/Item";
import Chart from "../components/Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const { id } = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30d":
        setDays("30d");
        setLoading(true);
        break;

      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200d":
        setDays("200d");
        setLoading(true);
        break;

      case "1y":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);

        break;
    }
  };
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        // console.log(chartData)

        setCoin(data);
        console.log(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id, currency, days]);

  if (error)
    return (
      <ErrorComponent
        message={`Request failed! Could not fetch ${id} informtion from API `}
      />
    );
  else
    return (
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box borderWidth={1} width={"full"}>
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p={"4"} overflowX={"auto"}>
              {btns.map((i) => (
                <Button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </Button>
              ))}
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value="inr">INR</Radio>
                <Radio value="eur">EUR</Radio>
                <Radio value="usd">USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
                Last updated on{" "}
                {String(coin.market_data.last_updated).split("T")[0]}{" "}
                {
                  String(coin.market_data.last_updated)
                    .split("T")[1]
                    .split(".")[0]
                }
              </Text>

              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>

                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >{`#${coin.market_cap_rank}`}</Badge>

              <Custombar
                high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
                current_percentage={
                  (coin.market_data.current_price[currency] * 100) /
                  coin.market_data.high_24h[currency]
                }
              />
              <Box w={"full"} p={"4"}>
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply?coin.market_data.max_supply: "Data Not Available"}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Capital"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    );
};

export default CoinDetails;
